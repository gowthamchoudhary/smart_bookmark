from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user
from app.modules.auth.schema import UserRegister
from  app.db.database import get_db
from fastapi import status,exceptions,HTTPException,Depends


router = APIRouter(prefix="/auth",tags=["auth"])
@router.post("/register")
def register(user:UserRegister,db:Session = Depends(get_db)):
    try:
        db_user = create_user(user.email,user.password,db)
        return {"message":"user registered succesfully"}
    except Exception as e:
        raise HTTPException(status_code =400,detail=str(e))
    
@router.post("/login")
def login():