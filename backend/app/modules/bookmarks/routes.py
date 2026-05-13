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

router = APIRouter(tags=["bookmarks"])


@router.post("/", response_model=BookmarkResponse)
def create(
    data: BookmarkCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        return create_bookmark(current_user, data, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[BookmarkResponse])
def get_all(workspace_id:int,current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    
    try:
        return get_user_bookmarks(workspace_id,current_user, db)
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
    db_workspace = db.query(Workspace).filter(Workspace.id==workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=404,detail="not workspace exists")
    if db_workspace.user_id!=user.id:
        raise HTTPException(status_code=403,detail="user is not allowed")
    
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