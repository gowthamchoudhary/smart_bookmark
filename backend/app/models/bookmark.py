from sqlalchemy import Column,Integer,String,ForeignKey,DateTime
from app.db.database import Base
from app.models import users
from datetime import datetime


from sqlalchemy.orm import relationship
class Bookmark(Base):
    __tablename__ = "bookmarks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String,nullable=False)
    url = Column(String,nullable=False)
    note = Column(String,nullable=False)
    
    created_at = Column(DateTime,default=datetime.utcnow)
    workspace_id = Column(Integer,ForeignKey("workspaces.id"))
    workspace = relationship("Workspace",back_populates="bookmarks")
