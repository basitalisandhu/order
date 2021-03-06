"""empty message

Revision ID: aaa70aa6eb04
Revises: 8c5b68e60ec9
Create Date: 2021-02-02 13:56:49.726658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aaa70aa6eb04'
down_revision = '8c5b68e60ec9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bolcreadential')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bolcreadential',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('client_id', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('client_secret', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='bolcreadential_pkey')
    )
    # ### end Alembic commands ###
