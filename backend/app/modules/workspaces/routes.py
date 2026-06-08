from fastapi import APIRouter,HTTPException,Depends

from sqlalchemy.orm import Session
from app.modules.workspaces.schema import WorkSpaceCreate,WorkSpaceResponse
from app.modules.auth.service import get_current_user
from app.db.database import get_db
from app.modules.workspaces.service import (
    create_workspace,
    delete_workspace,
    get_user_workspace,
    get_workspace as get_workspace_service,
    update_workspace as update_workspace_service,
)


router = APIRouter(prefix="/workspace",tags=["workspace"])

@router.post("/",response_model=WorkSpaceResponse)
def create_workspace_route(data:WorkSpaceCreate,db:Session=Depends(get_db),current_user = Depends(get_current_user)):
    return create_workspace(data.name,db,current_user)


@router.get("/",response_model=list[WorkSpaceResponse])
def get_workspaces_route(db:Session = Depends(get_db),current_user=Depends(get_current_user)):
    return get_user_workspace(db,current_user)

@router.get("/{workspace_id}")
def get_workspace_route(workspace_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return get_workspace_service(workspace_id,db,current_user)

@router.delete("/{workspace_id}")
def delete_workspace_route(workspace_id:int,db:Session = Depends(get_db),current_user = Depends(get_current_user)):
    return delete_workspace(workspace_id,db,current_user)

@router.patch("/{workspace_id}")
def update_workspace_route(workspace_id:int,name:str,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return update_workspace_service(workspace_id,name,db,current_user)
