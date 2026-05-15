from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime,timedelta,timezone

from app.core.config import Settings
from fastapi import HTTPException

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)
def get_token_hash(password):
    return pwd_context.hash(password)   


SECRET_KEY = Settings.SECRET_KEY
ALGORITHM = Settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = Settings.ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE_DAYS = Settings.REFRESH_TOKEN_EXPIRE_DAYS

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire,"type":"access"})
    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

def decode_token(token:str):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

def create_refresh_tokens(data:dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp":expire,
                      "type":"refresh"})
    refresh_token= jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
   
    return refresh_token


def validate_refresh_token(token:str):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        if payload.get("type")!="refresh":
            raise HTTPException(status_code=401,detail="invalid token ")
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401,detail="invalid token payload")
        return payload
    except JWTError as e:

