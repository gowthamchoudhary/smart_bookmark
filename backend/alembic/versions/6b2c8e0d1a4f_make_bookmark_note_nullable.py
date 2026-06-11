"""make bookmark note nullable

Revision ID: 6b2c8e0d1a4f
Revises: e1983376ffbc
Create Date: 2026-06-11
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "6b2c8e0d1a4f"
down_revision: Union[str, Sequence[str], None] = "e1983376ffbc"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "bookmarks",
        "note",
        existing_type=sa.String(),
        nullable=True,
    )


def downgrade() -> None:
    op.execute("UPDATE bookmarks SET note = '' WHERE note IS NULL")
    op.alter_column(
        "bookmarks",
        "note",
        existing_type=sa.String(),
        nullable=False,
    )
