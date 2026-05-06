from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user, login_user, get_current_user
from app.modules.auth.schema import UserRegister, UserLogin
from app.db.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
router = APIRouter(tags=["auth"])

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    try:
        create_user(user.email, user.password, db)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(form_data:OAuth2PasswordRequestForm=Depends(),db:Session = Depends(get_db)):
    try:
        token = login_user(form_data.username, form_data.password, db)
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    try:
        return {"id": current_user.id, "email": current_user.email}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
