from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user, login_user, get_current_user
from app.modules.auth.schema import UserRegister, UserLogin,RefreshTokenRequest
from app.db.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
router = APIRouter(tags=["auth"])
from app.core.security import decode_token,create_access_token,create_refresh_tokens
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
        tokens = login_user(form_data.username, form_data.password, db)
    
        
        return {"access_token": tokens.access_token,"refresh_token":tokens.refresh_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    try:
        return {"id": current_user.id, "email": current_user.email}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
@router.post("/refresh")
def refresh_token(data:RefreshTokenRequest):
    payload = decode_token(data.refresh_token)
    if payload.get("type")!="refresh":
        raise HTTPException(status_code=401,detail="invalid refresh token")
    user_id = payload["sub"]
    new_access_token = create_access_token({"sub":user_id,"type":"access"})
    new_refresh_token = create_refresh_tokens({"sub":user_id,"type":"refresh"})
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token
    }