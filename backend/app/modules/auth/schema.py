from pydantic import BaseModel,Field,EmailStr


class UserRegister(BaseModel):
    email:EmailStr
    username:str = Field(min_length=3,max_length=50)
    password:str = Field(min_length=6)
class UserLogin(BaseModel):
    email:EmailStr
    password:str 
class RefreshTokenRequest(BaseModel):
    refresh_token:str
