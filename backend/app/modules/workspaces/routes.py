from fastapi import APIRouter,HTTPException,Depends

from sqlalchemy.orm import Session
from app.modules.workspaces.schema import WorkSpaceCreate,WorkSpaceResponse
from app.modules.auth.service import get_current_user
from app.db.database import get_db
from app.modules.workspaces.service import get_user_workspace,create_workspace,delete_workspace,get_workspace

router = APIRouter(prefix="/workspace",tags=["workspace"])

@router.post("/",response_model=WorkSpaceResponse)
def create_workspace_route(data:WorkSpaceCreate,db:Session=Depends(get_db),current_user = Depends(get_current_user)):
    return create_workspace(data.name,db,current_user)


@router.get("/",response_model=list[WorkSpaceResponse])
def get_workspaces_route(db:Session = Depends(get_db),current_user=Depends(get_current_user)):
    return get_user_workspace(db,current_user)

@router.get("/{workspace_id}")
def get_workspace(workspace_id:int,db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    return get_workspace(workspace_id,db,current_user)

@router.delete("/{workspace_id}")
def delete_workspace_route(workspace_id:int,db:Session = Depends(get_db),current_user = Depends(get_current_user)):
    return delete_workspace(workspace_id,db,current_user)
