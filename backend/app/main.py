from fastapi import FastAPI
from app.db.database import Base, engine
from app.modules.auth.routes import router as auth_router
from app.modules.bookmarks.routes import router as bookmark_router
from app.middleware.logging import log_request
from app.modules.workspaces.routes import router as workspace_router



app = FastAPI()
app.middleware("http")(log_request)

app.include_router(auth_router, prefix="/auth")
app.include_router(bookmark_router, prefix="/bookmarks")
app.include_router(workspace_router)