from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.modules.bookmarks.service import (
    create_bookmark,
    get_user_bookmark,
    delete_bookmark
)
from app.modules.bookmarks.schema import create_bookmark,response_bookmark
from app.core.security import get_current_user


router = APIRouter(prefix="/bookmarks",tags=["bookmarks"])


@router.post("/",response_model=response_bookmark)
def create(data:create_bookmark,authorization:str=Depends(),db:Session = Depends(get_db)):
    try:
        token = authorization.split(" ")[1]
        current_user = get_current_user(token,db)
        return create_bookmark(current_user,data,db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=str(e))
    
@router.get("/",response_model=list[response_bookmark])
def get_all_bookmarks(authorization:str = Depends(),db:Session = Depends(get_db)):
    try:
        token = authorization.split(" ")[1]
        current_user = get_current_user(token,db)
        return get_user_bookmark(current_user,db)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=str(e))
@router.delete("/{bookmark_id}")
def delete_bookmark(bookmark_id:int,authorization:str = Depends(),db:Session = Depends(get_db)):
    try:
        token = authorization.split(" ")[1]
        current_user = get_current_user(token,db)
        delete_bookmark(bookmark_id,current_user,db)
        return {"message":"Bookmark deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail=str(e))