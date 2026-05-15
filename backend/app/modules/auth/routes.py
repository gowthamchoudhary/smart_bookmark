from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user, login_user, get_current_user
from app.modules.auth.schema import UserRegister, UserLogin,RefreshTokenRequest
from app.db.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
router = APIRouter(tags=["auth"])
from app.core.security import decode_token,create_access_token,create_refresh_tokens,get_token_hash
from app.models.users import RefreshToken
from datetime import datetime,timedelta
from app.core.config import Settings

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
def refresh_token(data:RefreshTokenRequest,db:Session=Depends(get_db)):
    payload = decode_token(data.refresh_token)
    if payload is None:
        raise HTTPException(status_code=401,detail="invalid token")
    if payload.get("type")!="refresh":
        raise HTTPException(status_code=401,detail="invalid refresh token")
    hash_token = get_token_hash(data.refresh_token)
    db_token = db.query(RefreshToken).filter(RefreshToken.token_hash==hash_token).first()
    if not db_token:
        raise HTTPException(status_code=401,detail="Invalid refresh token")
    if db_token.revoked or db_token.expires_at<datetime.utcnow():
        raise HTTPException(status_code=401,detail="refresh token expired")
    
    
    
    db_token.revoked=True
    user_id = payload["sub"]
    
    new_access_token = create_access_token({"sub":user_id,"type":"access"})
    new_refresh_token = create_refresh_tokens({"sub":user_id,"type":"refresh"})
    db.add(RefreshToken(user_id=user_id,token_hash=get_token_hash(new_refresh_token),expires_at = datetime.utcnow()+timedelta(days=Settings.REFRESH_TOKEN_EXPIRE_DAYS)))
    db.commit()

    

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token
    }
@router.post("/logout")
def logout(data:RefreshTokenRequest,db:Session = Depends(get_db)):
    hashed_token = get_token_hash(data.refresh_token)
    db_token = db.query(RefreshToken).filter(RefreshToken.token_hash==hashed_token).first()
    if not db_token:
        raise HTTPException(status_code=401,detail="invalid token")
    if db_token.revoked:
        raise HTTPException(status_code=400,detail="token already revoked")
    db_token.revoked = True
    db.commit()
    return {
        "message":"successfullt logged out"
    }

