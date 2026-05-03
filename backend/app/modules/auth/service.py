from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_password_hash, verify_password,create_access_token
from app.models.users import User
from fastapi import Depends, HTTPException, status

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
    token = create_access_token(data={"sub":db_user.email})
    return token