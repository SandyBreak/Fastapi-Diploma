# -*- coding: UTF-8 -*-
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from .base_model import Base


class Order(Base):
    __tablename__ = 'orders'
    
    client_id = Column(Integer, ForeignKey('base_schema.clients.id'), nullable=False)
    service_id = Column(Integer, ForeignKey('base_schema.services.id'), nullable=False)
    order_date = Column(Date, nullable=False)
    status = Column(String, nullable=False)

    client = relationship("Client", back_populates="orders")
    service = relationship("Service", back_populates="orders")
    payment = relationship("Payment", back_populates="order")
