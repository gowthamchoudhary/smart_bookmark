from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.modules.bookmarks.service import (
    create_bookmark,
    get_user_bookmarks,
    delete_bookmark
)
from app.modules.bookmarks.schema import BookmarkCreate, BookmarkResponse
from app.modules.auth.service import get_current_user

router = APIRouter(tags=["bookmarks"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


@router.post("/", response_model=BookmarkResponse)
def create(data: BookmarkCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        user = get_current_user(token, db)
        return create_bookmark(user, data, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[BookmarkResponse])
def get_all(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        user = get_current_user(token, db)
        return get_user_bookmarks(user, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{bookmark_id}")
def delete_route(bookmark_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        user = get_current_user(token, db)
        delete_bookmark(bookmark_id, user, db)
        return {"message": "Deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
