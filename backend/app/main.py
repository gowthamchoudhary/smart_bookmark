from fastapi import FastAPI
from app.db.database import Base, engine
from app.modules.auth.routes import router as auth_router
from app.modules.bookmarks.routes import router as bookmark_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(bookmark_router, prefix="/bookmarks")