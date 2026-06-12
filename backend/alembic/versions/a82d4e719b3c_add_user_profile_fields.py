"""add user profile fields

Revision ID: a82d4e719b3c
Revises: 6b2c8e0d1a4f
Create Date: 2026-06-12
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "a82d4e719b3c"
down_revision: Union[str, Sequence[str], None] = "6b2c8e0d1a4f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("username", sa.String(), nullable=True))
    op.add_column(
        "users",
        sa.Column("profile_picture", sa.String(), nullable=True),
    )
    op.execute(
        "UPDATE users "
        "SET username = split_part(email, '@', 1) || '_' || id "
        "WHERE username IS NULL"
    )
    op.alter_column(
        "users",
        "username",
        existing_type=sa.String(),
        nullable=False,
    )
    op.create_index(
        op.f("ix_users_username"),
        "users",
        ["username"],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_column("users", "profile_picture")
    op.drop_column("users", "username")
