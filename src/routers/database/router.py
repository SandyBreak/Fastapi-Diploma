# -*- coding: UTF-8 -*-
from fastapi import Depends, APIRouter, Form, HTTPException, Request

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from pydantic import ValidationError

from src.services import DatabaseService
from src.routers.database.utils import get_database_service, get_create_schema
from src.schemas import *

from config.database.db_helper import db_helper


router = APIRouter(prefix='/database', tags=["database"])


@router.post("/get_table")
async def get_table(name_table: str = Form(...), session: AsyncSession = Depends(db_helper.get_scope_session)):
    service: DatabaseService = get_database_service(name_table, session)    
    try:
        items = await service.get_table(name_table)
        return items
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{name_table}/save_record")
async def save_record(request: Request, name_table: str, session: AsyncSession = Depends(db_helper.get_scope_session)):
    service: DatabaseService = get_database_service(name_table, session)
    
    stored_data = await request.form()
    
    try:
        insert_data = await get_create_schema(name_table, stored_data)
        items = await service.save_record(insert_data.model_dump())
        return items
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/{name_table}/get_foreign_data")
async def get_table_data_fields(name_table: str, session: AsyncSession = Depends(db_helper.get_scope_session)):
    service: DatabaseService = get_database_service(name_table, session)

    try:
        foreign_data = await service.get_foreign_data(name_table)

        return foreign_data
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{name_table}/delete_record/{row_id}")
async def delete_record(name_table: str, row_id: int, session: AsyncSession = Depends(db_helper.get_scope_session)):
    service: DatabaseService = get_database_service(name_table, session)
    
    try:
        await service.delete(row_id)
        return {"detail": "Data deleted successfully"}
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Cannot delete this record because it is referenced by other records.")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))