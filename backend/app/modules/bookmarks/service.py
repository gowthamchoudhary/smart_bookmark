from sqlalchemy.orm import Session
from app.models.bookmark import Bookmark   
from sqlalchemy import or_  
from fastapi import HTTPException
from app.models.workspace import Workspace
from app.modules.workspaces.service import validate_workspace_access
  
def create_bookmark(workspace_id,user,data,db:Session):
    db_workspace = validate_workspace_access(workspace_id,user.id,db)    
    new_bookmark = Bookmark(title=data.title,url=str(data.url),note=data.note,workspace_id=db_workspace.id)
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark




def get_user_bookmarks(workspace_id,user,db:Session):
   
    db_workspace = validate_workspace_access(workspace_id,user.id,db)  
    return db.query(Bookmark).filter(Bookmark.workspace_id==db_workspace.id).all()




def delete_bookmark(workspace_id,bookmark_id,user,db:Session):
    bookmark = (db.query(Bookmark).filter(Bookmark.id==bookmark_id ,Bookmark.workspace_id==workspace_id).first())
    db_workspace = validate_workspace_access(workspace_id,user.id,db)  
    if not bookmark:
        raise HTTPException(status_code=404,detail="Bookmark not found")
 
    db.delete(bookmark)
    db.commit()
    return {"message":"Bookmark deleted successfully"}

def search_bookmark(workspace_id,user, size, skip, query, db: Session):

    db_workspace = validate_workspace_access(workspace_id,user.id,db)  
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



