from sqlalchemy.orm import Session
from app.models.bookmark import Bookmark   
from sqlalchemy import or_  
from fastapi import HTTPException
from app.models.workspace import Workspace
  
def create_bookmark(user,data,db:Session):
    db_workspace = db.query(Workspace).filter(Workspace.id==data.workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=403,detail="workspace not found")
    if db_workspace.user_id!=user.id:
        raise HTTPException(status_code=403,detail="not allowed")
    
    new_bookmark = Bookmark(title=data.title,url=str(data.url),note=data.note,workspace_id=db_workspace.id)
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark




def get_user_bookmarks(workspace_id,user,db:Session):
    db_workspace = db.query(Workspace).filter(Workspace.id==workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=404,detail="workspace doesnt exists")
    if db_workspace.user_id!=user.id:
        raise HTTPException(status_code=403,detail="user is not allowed")
    
    return db.query(Bookmark).filter(Bookmark.workspace_id==workspace_id).all()




def delete_bookmark(workspace_id,bookmark_id,user,db:Session):
    bookmark = db.query(Bookmark).filter(Bookmark.id==bookmark_id).first()
    db_workspace = db.query(Workspace).filter(Workspace.id==workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=404,detail="workspace doesnt exist")
    if db_workspace.user_id!=user.id:
        raise HTTPException(status_code=403,detail="you are not authorized to delete this file")
    if not bookmark:
        raise HTTPException(status_code=404,detail="Bookmark not found")
    if bookmark.workspace_id != workspace_id:
        raise HTTPException(status_code=403,detail="You are not authorized to delete this bookmark")
    db.delete(bookmark)
    db.commit()
    return {"message":"Bookmark deleted successfully"}

def search_bookmark(workspace_id,user, size, skip, query, db: Session):

    db_workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=404,detail="no files exists!")
    if db_workspace.user_id!=user.id:
        raise HTTPException(status_code=403,detail="you are not allowed")
    bookmarks = db.query(Bookmark).filter(
        Bookmark.workspace_id == workspace_id
    )
    


    search = f"%{query}%"

    bookmarks = bookmarks.filter(
        or_(
            Bookmark.title.ilike(search),
            Bookmark.note.ilike(search),
            Bookmark.url.ilike(search),
        )
    )

    
    total = bookmarks.count()

    bookmarks = (
        bookmarks
        .order_by(Bookmark.id.desc())
        .offset(skip)
        .limit(size)
        .all()
    )

    return bookmarks, total



