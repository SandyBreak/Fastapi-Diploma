# -*- coding: UTF-8 -*-
from typing import Dict, Any

from fastapi import Depends, APIRouter, Form, HTTPException, Request

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select

from pydantic import ValidationError
from src.repositories.sqlalchemy_repository import SqlAlchemyRepository

from src.models import Client, Order, Payment, Review, Service

from src.schemas import *

from config.database.db_helper import db_helper

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

router = APIRouter(prefix='/database', tags=["database"])
@router.post("/get_table")
async def get_table(name_table: str = Form(...), session: AsyncSession = Depends(db_helper.get_scope_session)):
    if name_table not in TABLES_MODELS:
        raise HTTPException(status_code=404, detail="Table not found")
    model = TABLES_MODELS[name_table]

    repo = SqlAlchemyRepository(model, session)

    try:
        items = await repo.get_multi(name_table=name_table, limit=100)
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def get_create_schema(name_table: str, data: Dict[str, Any]) -> BaseModel:
    if name_table not in CREATE_MODELS:
        raise HTTPException(status_code=404, detail="Table not found")
    model = CREATE_MODELS[name_table]
    
    return model(**data)  # Создаем экземпляр модели с данными


@router.post("/save_data")
async def save_data(request: Request, name_table: str = Form(...), session: AsyncSession = Depends(db_helper.get_scope_session)):
    data = await request.form()
    model = TABLES_MODELS[name_table]
    repo = SqlAlchemyRepository(model, session)
    
    try:
        insert_data = await get_create_schema(name_table, data)
        items = await repo.create(insert_data.model_dump())
        return items
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/get_foreign_data")
async def get_table_data_fields(name_table: str = Form(...), session: AsyncSession = Depends(db_helper.get_db_session)):
    async with session as db_session:
        try:
            match name_table:
                case 'clients':
                    result = await db_session.execute(select(Client.id, (Client.first_name + ' ' + Client.last_name).label('value')).select_from(Client))
                case 'services':
                    result = await db_session.execute(select(Service.id, (Service.name).label('value')).select_from(Service))
                case 'orders':
                    result = await db_session.execute(select(Order.id, (Order.id).label('value')).select_from(Order))
            items = result.mappings().all()
            return items
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        
        
@router.delete("/delete_data")
async def delete_data(name_table: str = Form(...), row_id: int = Form(...), session: AsyncSession = Depends(db_helper.get_scope_session)):
    model = TABLES_MODELS[name_table]
    if model is None:
        raise HTTPException(status_code=404, detail="Table not found")

    repo = SqlAlchemyRepository(model, session)
    
    try:
        await repo.delete(id=row_id)  # Предполагается, что у вас есть поле id для фильтрации
        return {"detail": "Data deleted successfully"}
    except IntegrityError:
        # Обработка ошибки внешнего ключа
        raise HTTPException(status_code=400, detail="Cannot delete this record because it is referenced by other records.")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))