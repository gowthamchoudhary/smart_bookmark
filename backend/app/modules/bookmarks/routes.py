from fastapi import APIRouter, Depends, HTTPException,Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.modules.bookmarks.service import (
    create_bookmark,
    get_user_bookmarks,
    delete_bookmark,
    search_bookmark,
)
from app.modules.bookmarks.schema import BookmarkCreate, BookmarkResponse
from app.modules.auth.service import get_current_user
from app.models.workspace import Workspace
from app.models.bookmark import Bookmark
from app.modules.workspaces.service import validate_workspace_access

router = APIRouter(tags=["bookmarks"])


@router.post("/{workspace_id}", response_model=BookmarkResponse)
def create(
    workspace_id:int,
    data: BookmarkCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        return create_bookmark(workspace_id,current_user, data, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


   


@router.delete("/{workspace_id}/{bookmark_id}")
def delete_route(
    workspace_id:int,
    bookmark_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
        delete_bookmark(workspace_id,bookmark_id, current_user, db)
        return {"message": "Deleted successfully"}
   
@router.get("/", response_model=list[BookmarkResponse])
def get_all(workspace_id:int,current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    

        return get_user_bookmarks(workspace_id,current_user, db)

@router.get("/{workspace_id}/search")
def search_bookmarks(
    workspace_id:int,
    query: str,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    skip = (page - 1) * size

    bookmarks, total = search_bookmark(
        workspace_id,
        current_user,
        size,
        skip,
        query,
        db
    )

    return {
        "items": bookmarks,
        "page": page,
        "size": size,
        "total": total,
        "pages": (total + size - 1) // size
    }
    
@router.get("/{workspace_id}/paginated")
def get_bookmarks(
    workspace_id:int,
    page:int=Query(1,ge=1),
    size:int = Query(10,ge=1,le=100),
    db:Session=Depends(get_db),
    user = Depends(get_current_user)
):
    db_workspace = validate_workspace_access(workspace_id,user.id,db)  
    
    offset = (page-1)*size
    bookmarks = db.query(Bookmark).filter(Bookmark.workspace_id==workspace_id).offset(offset).limit(size).all()
    total = db.query(Bookmark).filter(Bookmark.workspace_id==workspace_id).count()
    return {
        "items":bookmarks,
        "page":page,
        "size":size,
        "total":total,
        "pages":(total+size-1)//size
    }
