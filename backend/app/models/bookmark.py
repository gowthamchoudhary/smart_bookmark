from sqlalchemy import Column,Integer,String,ForeignKey
from app.db.database import Base
from app.models import users
from datetime import datetime
# 🗄️ Step 2: Model

# 📍 models/bookmark.py

# You should define:

# id (primary key)
# title
# url
# note
# user_id (FOREIGN KEY 🔥)
# created_at

# 👉 Important:

# Every bookmark belongs to a user


class Bookmark(Base):
    __tablename__ = "bookmarks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    note = Column(String)
    user_id = Column(Integer, ForeignKey(users.id))
    created_at = Column(datetime)