from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from datetime import datetime
from app.db.database import Base
from sqlalchemy.orm import relationship



class Workspace(Base):
    __tablename__="workspaces"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,nullable=False)
    user_id = Column(Integer,ForeignKey("users.id"))
    created_at = Column(DateTime,default=datetime.utcnow())
    owner = relationship("User",back_populates="workspaces")
    bookmarks = relationship("Bookmark",back_populates="workspace")

