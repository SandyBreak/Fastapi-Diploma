# -*- coding: UTF-8 -*-

from typing import Type, Optional

from fastapi import HTTPException

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.repositories.sqlalchemy_repository import SqlAlchemyRepository, ModelType
from src.models import Base, Client, Service, Review

from .base_service import BaseService
from src.schemas import *



class DatabaseService(BaseService):
    def __init__(self, model: Type[Base], db_session: AsyncSession):
        super().__init__(repository=SqlAlchemyRepository(model, db_session))
        self.model = model


    async def delete_record(self, row_id: int) -> None:
        await self.repository.delete(id=row_id)

    
    async def save_record(self, insert_data) -> None:
        await self.repository.create(insert_data)
        
        
    async def get_foreign_data(self, name_table: str) -> Optional[ModelType] | None:
        match name_table:
            case 'clients':
                stmt = select(self.model.id, (self.model.first_name + ' ' + self.model.last_name).label('value')).select_from(self.model)
            case 'services':
                stmt = select(self.model.id, (self.model.name).label('value')).select_from(self.model)
            case 'orders':
                stmt = select(self.model.id, (self.model.id).label('value')).select_from(self.model)
        
        foreign_data = await self.repository.get_foreign_data(stmt)
        
        return foreign_data
    
    async def get_table(self, name_table: str) -> Optional[ModelType] | None:
        match name_table:
            case 'clients':
                result = await self.repository.get_multi_v2()
                response = [ClientResponse.model_validate(row.__dict__) for row in result]
            case 'services':
                result = await self.repository.get_multi_v2()
                response = [ServiceResponse.model_validate(row.__dict__) for row in result]
            case 'orders':
                stmt = select(
                    self.model.id,
                    (Client.first_name + ' ' + Client.last_name).label('client'),  # ФИО клиента
                    (Service.name).label('name_service'),  # Название услуги
                    self.model.status,
                    self.model.order_date
                ).select_from(self.model).join(Client, Client.id == self.model.client_id).join(Service, Service.id == self.model.service_id)
                
                result = await self.repository.get_multi_v2(stmt=stmt)
                response = [OrderResponse.model_validate(row) for row in result]
            case 'reviews':
                stmt = select(
                    Review.id,  # id отзыва
                    (Service.name).label('name_service'),
                    (Client.first_name + ' ' + Client.last_name).label('client'), # Имя клиента
                    Review.review_date,  # Дата отзыва
                    Review.rating,  # Рейтинг
                    Review.text,  # Текст отзыва
                ).select_from(Review).join(Client, Client.id == Review.client_id).join(Service, Service.id == self.model.service_id)
                
                result = await self.repository.get_multi_v2(stmt=stmt)
                response = [ReviewResponse.model_validate(row) for row in result]
            case 'payments':
                result = await self.repository.get_multi_v2()
                response = [PaymentResponse.model_validate(row.__dict__) for row in result]
            case _:
                raise HTTPException(status_code=404, detail="Table not supported")
        
        return response