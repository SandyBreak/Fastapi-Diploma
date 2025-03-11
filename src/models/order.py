# -*- coding: UTF-8 -*-
from sqlalchemy import Integer, String, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base

class Order(Base):
    __tablename__ = 'orders'
    
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey('base_schema.clients.id'), nullable=False)
    service_id: Mapped[int] = mapped_column(Integer, ForeignKey('base_schema.services.id'), nullable=False)
    order_date: Mapped[Date] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)

    client = relationship("Client", back_populates="orders")
    service = relationship("Service", back_populates="orders")
    payment = relationship("Payment", back_populates="order")
