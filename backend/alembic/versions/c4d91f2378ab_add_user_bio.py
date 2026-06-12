"""add user bio

Revision ID: c4d91f2378ab
Revises: a82d4e719b3c
Create Date: 2026-06-12
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c4d91f2378ab"
down_revision: Union[str, Sequence[str], None] = "a82d4e719b3c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("bio", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "bio")
