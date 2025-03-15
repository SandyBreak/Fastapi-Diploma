# -*- coding: UTF-8 -*-
from typing import Type, Dict, Any

from fastapi import Depends, HTTPException

from sqlalchemy.ext.asyncio import AsyncSession

from config.database.db_helper import db_helper

from src.models import Client, Order, Payment, Review, Service

from src.services import DatabaseService

from src.schemas import *

TABLES_MODELS = {
    'clients': Client,
    'services': Service,
    'orders': Order,
    'reviews': Review,
    'payments': Payment
}

CREATE_MODELS: Dict[str, Any] = {
    "clients": ClientCreateSchema,
    "orders": OrderCreateSchema,
    "payments": PaymentCreateSchema,
    "reviews": ReviewCreateSchema,
    "services": ServiceCreateSchema,
}

def get_database_service(name_table: str, session: AsyncSession = Depends(db_helper.get_scope_session)) -> DatabaseService:
    model = get_table_model(name_table)
    return DatabaseService(model, session)


def get_table_model(name_table: str) -> Type:
    """Получает модель таблицы по имени. Если таблица не найдена, вызывает исключение."""
    if name_table not in TABLES_MODELS:
        raise HTTPException(status_code=404, detail="Table not found")
    return TABLES_MODELS[name_table]


async def get_create_schema(name_table: str, data: Dict[str, Any]) -> BaseModel:
    if name_table not in CREATE_MODELS:
        raise HTTPException(status_code=404, detail="Table not found")
    model = CREATE_MODELS[name_table]
    
    return model(**data)  # Создаем экземпляр модели с данными
