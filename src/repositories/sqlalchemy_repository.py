from typing import Type, TypeVar, Optional, Generic,  Optional, List

from pydantic import BaseModel
from sqlalchemy import delete, select, update, asc
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.base_model import Base
from src.schemas import *
from .base_repository import AbstractRepository


ModelType = TypeVar("ModelType", bound=Base)

CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class SqlAlchemyRepository(AbstractRepository, Generic[ModelType, CreateSchemaType, UpdateSchemaType]):

    def __init__(self, model: Type[ModelType], db_session: AsyncSession):
        self._session_factory = db_session
        self.model = model

    async def create(self, data: CreateSchemaType) -> ModelType:
        async with self._session_factory() as session:
            instance = self.model(**data)
            session.add(instance)
            await session.commit()
            await session.refresh(instance)
            return instance

    async def update(self, data: UpdateSchemaType, **filters) -> ModelType:
        async with self._session_factory() as session:
            stmt = update(self.model).values(**data).filter_by(**filters).returning(self.model)
            res = await session.execute(stmt)
            await session.commit()
            return res.scalar_one()

    async def delete(self, **filters) -> None:
        async with self._session_factory() as session:
            await session.execute(delete(self.model).filter_by(**filters))
            await session.commit()

    async def add(self, **filters) -> None:
        async with self._session_factory() as session:
            await session.execute(delete(self.model).filter_by(**filters))
            await session.commit()
            
    async def get_single(self, **filters) -> Optional[ModelType] | None:
        async with self._session_factory() as session:
            row = await session.execute(select(self.model).filter_by(**filters))
            return row.scalar_one_or_none()
    
    
    async def get_foreign_data(self, stmt: select) -> Optional[ModelType] | None:
        async with self._session_factory() as session:
            result = await session.execute(stmt)
            foreign_data = result.mappings().all()
            return foreign_data

                
    async def get_multi(self, order: str = "id", limit: int = 100, offset: int = 0) -> list[ModelType]:
        async with self._session_factory() as session:
            stmt = select(self.model).limit(limit).offset(offset).order_by(*order)
            row = await session.execute(stmt)
            return row.scalars().all()
        
    
    async def get_multi_v2(self, stmt: select = None, return_type: str = 'mappings', limit: int = 100, offset: int = 0) -> List[ModelType]:
        async with self._session_factory() as session:
            if stmt is None:
                stmt = select(self.model).limit(limit).offset(offset)
                return_type = 'scalars'

            stmt = stmt.order_by(asc(self.model.id)).limit(limit).offset(offset)
            
            result = await session.execute(stmt)
            
            if return_type == 'mappings':
                response = result.mappings().all()
            elif return_type == 'scalars':
                response = result.scalars().all()
            
            return response
