from pydantic import BaseModel,HttpUrl
from typing import Optional
from datetime import datetime

class BookmarkCreate(BaseModel):
    title:str
    url:HttpUrl
    note:Optional[str] = None
    workspace_id:int

class BookmarkUpdate(BaseModel):
    title:str
    note:Optional[str] = None

class BookmarkResponse(BaseModel):
    id:int
    title:str
    url:str
    note:Optional[str] = None
    workspace_id:Optional[int] = None
    created_at:datetime
    class Config:
        from_attributes = True

