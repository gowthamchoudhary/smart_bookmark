from fastapi import APIRouter, Depends, HTTPException, status,Header
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user,get_current_user,login_user
from app.modules.auth.schema import UserRegister,UserLogin
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
def login(user:UserLogin,db:Session = Depends(get_db)):
    try:
        token = login_user(user.email,user.password,db)
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code =400,detail=str(e))
    

@router.get("/me")
def get_me(authorization:str = Header(...),db:Session = Depends(get_db)):
    try:
        token = authorization.split(" ")[1]
        user = get_current_user(token,db)
        return {"id":user.id,"email":user.email}
    except Exception as e:
        raise HTTPException(status_code=401,detail=str(e))