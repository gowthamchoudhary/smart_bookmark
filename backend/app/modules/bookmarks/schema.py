from pydantic import BaseModel,HttpUrl
from typing import Optional
from datetime import datetime

class BookmarkCreate(BaseModel):
    title:str
    url:HttpUrl
    note:Optional[str] = None
class BookmarkResponse(BaseModel):
    id:int
    title:str
    url:str
    note:Optional[str] = None
    created_at:datetime

