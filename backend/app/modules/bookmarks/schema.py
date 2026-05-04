from pydantic import BaseModel,HttpUrl
from typing import Optional
from datetime import datetime

class create_bookmark(BaseModel):
    title:str
    url:HttpUrl
    note:Optional[str] = None
class response_bookmark(BaseModel):
    id:int
    title:str
    url:str
    note:Optional[str] = None
    created_at:datetime