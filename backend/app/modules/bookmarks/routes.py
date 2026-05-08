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
def get_all(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return get_user_bookmarks(current_user, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{bookmark_id}")
def delete_route(
    bookmark_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        delete_bookmark(bookmark_id, current_user, db)
        return {"message": "Deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search")
def search_bookmarks(
    query: str,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    skip = (page - 1) * size

    bookmarks, total = search_bookmark(
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
    
@router.get("/paginated")
def get_bookmarks(
    page:int=Query(1,ge=1),
    size:int = Query(10,ge=1,le=100),
    db:Session=Depends(get_db)
):
    offset = (page-1)*size
    bookmarks = db.query(bookmarks).offset(offset).limit(size).all()
    total = db.query(bookmarks).count()
    return {
        "items":bookmarks,
        "page":page,
        "size":size,
        "total":total,
        "pages":(total+size-1)//size
    }