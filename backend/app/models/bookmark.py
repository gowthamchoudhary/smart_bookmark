from sqlalchemy import Column,Integer,String,ForeignKey,DateTime
from app.db.database import Base
from app.models import users
from datetime import datetime



class Bookmark(Base):
    __tablename__ = "bookmarks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String,nullable=False)
    url = Column(String,nullable=False)
    note = Column(String,nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime,default=datetime.utcnow)
