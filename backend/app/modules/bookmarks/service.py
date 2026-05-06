from sqlalchemy.orm import Session
from app.models.bookmark import Bookmark   
from sqlalchemy import or_  
  
def create_bookmark(user,data,db:Session):
    new_bookmark = Bookmark(title=data.title,url=str(data.url),note=data.note,user_id=user.id)
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark
def get_user_bookmarks(user,db:Session):
    return db.query(Bookmark).filter(Bookmark.user_id==user.id).all()

def delete_bookmark(bookmark_id,user,db:Session):
    bookmark = db.query(Bookmark).filter(Bookmark.id==bookmark_id).first()
    if not bookmark:
        raise ValueError("Bookmark not found")
    if bookmark.user_id != user.id:
        raise ValueError("You are not authorized to delete this bookmark")
    db.delete(bookmark)
    db.commit()
    return {"message":"Bookmark deleted successfully"}

def search_bookmark(user,query,db:Session):
    bookmarks  = db.query(Bookmark).filter(Bookmark.user_id==user.id)
    if bookmarks:
        search = f"%{query}%"
        bookmarks = bookmarks.filter(or_(Bookmark.title.ilike(f"%{search}"),
                                         Bookmark.note.ilike(f"%{search}"),
                                         Bookmark.url.ilike(f"%{search}"),))
    return bookmarks.all()



