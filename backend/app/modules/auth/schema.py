from typing import Optional

from pydantic import BaseModel,Field,EmailStr


class UserRegister(BaseModel):
    email:EmailStr
    username:str = Field(min_length=3,max_length=50)
    bio:Optional[str] = Field(default=None,max_length=300)
    password:str = Field(min_length=6)
class UserLogin(BaseModel):
    email:EmailStr
    password:str 

class BioUpdate(BaseModel):
    bio:Optional[str] = Field(default=None,max_length=300)

class RefreshTokenRequest(BaseModel):
    refresh_token:str
