from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_password_hash, verify_password,create_access_token,decode_token,create_refresh_tokens
from app.models.users import User
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")                                                            

def create_user(email:str,password:str,db:Session):
    db_user = db.query(User).filter(User.email==email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Email already registered")
    hash_password = get_password_hash(password)
    new_user = User(email=email,password=hash_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def login_user(email:str,password:str,db:Session):
    db_user= db.query(User).filter(User.email==email).first()
    if not db_user:
        raise HTTPException(status_code=400,detail="Invalid credentials")
    if not verify_password(password,db_user.password):
        raise HTTPException(status_code=400,detail="invalid credentials")
    token = create_access_token(data={"sub":str(db_user.id),"type":"access"})
    refresh_token =  create_refresh_tokens(data={"sub":str(db_user.id),"type":"refresh"})
    return {"access_token":token,"refresh_token":refresh_token}

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    payload = decode_token(token)
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401,detail="Invalid token")
    user = db.query(User).filter(User.id==user_id).first()
    if user is None:
        raise HTTPException(status_code=404,detail="User not found")
    return user
