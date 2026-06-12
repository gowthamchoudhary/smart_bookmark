from pathlib import Path
import re
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    Request,
    UploadFile,
)
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.modules.auth.service import create_user, login_user, get_current_user
from app.modules.auth.schema import BioUpdate, RefreshTokenRequest
from app.db.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
router = APIRouter(tags=["auth"])
from app.core.security import decode_token,create_access_token,create_refresh_tokens,get_refresh_token_hash
from app.models.users import RefreshToken
from datetime import datetime,timedelta
from app.core.config import Settings

BACKEND_DIR = Path(__file__).resolve().parents[3]
PROFILE_PICTURE_DIR = BACKEND_DIR / "uploads" / "profile-pictures"
MAX_PROFILE_PICTURE_SIZE = 5 * 1024 * 1024
ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

@router.post("/register")
async def register(
    email: EmailStr = Form(...),
    username: str = Form(..., min_length=3, max_length=50),
    password: str = Form(..., min_length=6),
    bio: str | None = Form(default=None, max_length=300),
    profile_picture: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
):
    picture_path = None

    try:
        username = username.strip()
        bio = bio.strip() if bio else None
        if not re.fullmatch(r"[A-Za-z0-9_]+", username):
            raise HTTPException(
                status_code=400,
                detail="Username may contain only letters, numbers, and underscores",
            )

        if profile_picture:
            extension = ALLOWED_IMAGE_TYPES.get(profile_picture.content_type)
            if not extension:
                raise HTTPException(
                    status_code=400,
                    detail="Profile picture must be JPEG, PNG, or WebP",
                )

            contents = await profile_picture.read(MAX_PROFILE_PICTURE_SIZE + 1)
            if len(contents) > MAX_PROFILE_PICTURE_SIZE:
                raise HTTPException(
                    status_code=400,
                    detail="Profile picture must be 5 MB or smaller",
                )

            PROFILE_PICTURE_DIR.mkdir(parents=True, exist_ok=True)
            filename = f"{uuid4().hex}{extension}"
            file_path = PROFILE_PICTURE_DIR / filename
            file_path.write_bytes(contents)
            picture_path = f"/uploads/profile-pictures/{filename}"

        create_user(
            str(email),
            username,
            password,
            picture_path,
            bio,
            db,
        )
        return {"message": "User registered successfully"}
    except Exception:
        if picture_path:
            (BACKEND_DIR / picture_path.lstrip("/")).unlink(missing_ok=True)
        raise


@router.post("/login")
def login(form_data:OAuth2PasswordRequestForm=Depends(),db:Session = Depends(get_db)):
    try:
        tokens = login_user(form_data.username, form_data.password, db)
    
        
        return {"access_token": tokens["access_token"],"refresh_token":tokens["refresh_token"], "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me")
def get_me(request: Request, current_user=Depends(get_current_user)):
    try:
        profile_picture = current_user.profile_picture
        if profile_picture:
            profile_picture = (
                f"{str(request.base_url).rstrip('/')}{profile_picture}"
            )

        return {
            "id": current_user.id,
            "email": current_user.email,
            "username": current_user.username,
            "profile_picture": profile_picture,
            "bio": current_user.bio,
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.patch("/me/bio")
def update_bio(
    data:BioUpdate,
    current_user=Depends(get_current_user),
    db:Session=Depends(get_db),
):
    current_user.bio = data.bio.strip() if data.bio else None
    db.commit()
    db.refresh(current_user)
    return {"bio":current_user.bio}
    

@router.post("/refresh")
def refresh_token(data:RefreshTokenRequest,db:Session=Depends(get_db)):
    payload = decode_token(data.refresh_token)
    if payload is None:
        raise HTTPException(status_code=401,detail="invalid token")
    if payload.get("type")!="refresh":
        raise HTTPException(status_code=401,detail="invalid refresh token")
    hash_token = get_refresh_token_hash(data.refresh_token)
    db_token = db.query(RefreshToken).filter(RefreshToken.token_hash==hash_token).first()
    if not db_token:
        raise HTTPException(status_code=401,detail="Invalid refresh token")
    if db_token.revoked or db_token.expires_at<datetime.utcnow():
        raise HTTPException(status_code=401,detail="refresh token expired")
    
    
    
    db_token.revoked=True
    user_id = payload["sub"]
    
    new_access_token = create_access_token({"sub":user_id,"type":"access"})
    new_refresh_token = create_refresh_tokens({"sub":user_id,"type":"refresh"})
    db.add(RefreshToken(user_id=user_id,token_hash=get_refresh_token_hash(new_refresh_token),expires_at = datetime.utcnow()+timedelta(days=Settings.REFRESH_TOKEN_EXPIRE_DAYS)))
    db.commit()

    

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token
    }
@router.post("/logout")
def logout(data:RefreshTokenRequest,db:Session = Depends(get_db)):
    hashed_token = get_refresh_token_hash(data.refresh_token)
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

