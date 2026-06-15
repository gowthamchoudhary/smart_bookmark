from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import Settings

DATABASE_URL = Settings.DATABASE_URL
database_url = make_url(DATABASE_URL)
engine_options = {"pool_pre_ping": True}

if (
    database_url.drivername.startswith("postgresql")
    and database_url.host not in {"localhost", "127.0.0.1"}
    and "sslmode" not in database_url.query
):
    engine_options["connect_args"] = {
        "sslmode": Settings.DATABASE_SSLMODE,
    }

engine = create_engine(DATABASE_URL, **engine_options)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
