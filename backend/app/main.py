from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.db.database import Base, engine
from app.modules.auth.routes import router as auth_router
from app.modules.bookmarks.routes import router as bookmark_router
from app.modules.workspaces.routes import router as workspace_router
from app.middleware.logging import log_request

app = FastAPI()
UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging middleware
app.middleware("http")(log_request)

app.include_router(auth_router, prefix="/auth")
app.include_router(bookmark_router, prefix="/bookmarks")
app.include_router(workspace_router)
