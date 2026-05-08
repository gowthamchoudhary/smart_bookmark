from sqlalchemy import Column,Integer,String,ForeignKey,DateTime,Boolean
from app.db.database import Base
from datetime import datetime   

from sqlalchemy.orm import relationship
class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    email=Column(String,unique=True,index=True,nullable=False)
    password=Column(String)
    refresh_tokens = relationship("RefreshToken",back_populates="user")

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"
    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    token_hash = Column(String,nullable=False,unique=True,index=True)
    expires_at = Column(DateTime,nullable=False)
    device_info = Column(String,nullable=True)
    created_at = Column(DateTime,default=datetime.utcnow)
    revoked = Column(Boolean,default=False)
    user = relationship("User",back_populates="refresh_tokens")
