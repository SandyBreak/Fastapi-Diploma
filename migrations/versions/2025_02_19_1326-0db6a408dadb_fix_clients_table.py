"""Fix clients table

Revision ID: 0db6a408dadb
Revises: 
Create Date: 2025-02-19 13:26:37.127889

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0db6a408dadb'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Создание таблицы клиентов
    op.create_table('clients',
        sa.Column('client_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('registration_date', sa.Date(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы сотрудников
    op.create_table('employees',
        sa.Column('employee_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('position', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы услуг
    op.create_table('services',
        sa.Column('service_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы запасов
    op.create_table('stock',
        sa.Column('product_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы заказов
    op.create_table('orders',
        sa.Column('order_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('client_id', sa.Integer(), sa.ForeignKey('clients.client_id'), nullable=False),
        sa.Column('service_id', sa.Integer(), sa.ForeignKey('services.service_id'), nullable=False),
        sa.Column('order_date', sa.Date(), nullable=False),
        sa.Column('status', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы отзывов
    op.create_table('reviews',
        sa.Column('review_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('client_id', sa.Integer(), sa.ForeignKey('clients.client_id'), nullable=False),
        sa.Column('service_id', sa.Integer(), sa.ForeignKey('services.service_id'), nullable=False),
        sa.Column('review_date', sa.Date(), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=False),
        sa.Column('text', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы расписаний
    op.create_table('schedules',
        sa.Column('record_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('employee_id', sa.Integer(), sa.ForeignKey('employees.employee_id'), nullable=False),
        sa.Column('date_time', sa.Date(), nullable=False),
        sa.Column('service_id', sa.Integer(), sa.ForeignKey('services.service_id'), nullable=False),
        sa.Column('status', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )

    # Создание таблицы платежей
    op.create_table('payments',
        sa.Column('payment_id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('order_id', sa.Integer(), sa.ForeignKey('orders.order_id'), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('payment_date', sa.Date(), nullable=False),
        sa.Column('payment_method', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.TIMESTAMP(timezone=True), nullable=False),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### команды для отката миграции ###
    op.drop_table('payments')
    op.drop_table('schedules')
    op.drop_table('reviews')
    op.drop_table('orders')
    op.drop_table('stock')
    op.drop_table('services')
    op.drop_table('employees')
    op.drop_table('clients')
    # ### end Alembic commands ###
