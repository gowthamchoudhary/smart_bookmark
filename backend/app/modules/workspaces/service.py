
from sqlalchemy.orm import Session
from app.models.workspace import Workspace

from datetime import datetime
from fastapi import HTTPException

def create_workspace(name:str,db:Session ,current_user):
    db_workspace = Workspace(name=name,user_id=current_user.id,created_at = datetime.utcnow() )
    db.add(db_workspace)
    db.commit()
    db.refresh(db_workspace)
    return db_workspace
    

def get_user_workspace(db:Session,current_user):
    db_workspace = db.query(Workspace).filter(Workspace.user_id==current_user.id).all()
    return db_workspace


def delete_workspace(workspace_id:int,db:Session,current_user):
    
    db_workspace = db.query(Workspace).filter(Workspace.id==workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=404,detail="workspace doesnt exist")
    if db_workspace.user_id!=current_user.id:
        raise HTTPException(status_code=401,detail="not allowed")
    db.delete(db_workspace)
    db.commit()
    return {"message":"successfully deleted the workspace"}


