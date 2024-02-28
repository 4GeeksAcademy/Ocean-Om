"""empty message

Revision ID: e7b7b12d5fa1
Revises: 6650af66c96c
Create Date: 2024-02-28 21:37:49.075597

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e7b7b12d5fa1'
down_revision = '6650af66c96c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('role')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', postgresql.ENUM('Student', 'Instructor', name='role'), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
