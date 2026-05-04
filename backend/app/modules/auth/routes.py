from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user, login_user, get_current_user
from app.modules.auth.schema import UserRegister, UserLogin
from app.db.database import get_db
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
router = APIRouter(tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
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
def get_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        
        user = get_current_user(token, db)
        return {"id": user.id, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))