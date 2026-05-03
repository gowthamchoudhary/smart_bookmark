from fastapi import FastAPI 
from app.modules.auth.routes import router as auth_router
from app.db.database import Base
from app.db.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)

