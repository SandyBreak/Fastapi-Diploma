# -*- coding: UTF-8 -*-
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from .base_model import Base

class Payment(Base):
    __tablename__ = 'payments'
    
    order_id = Column(Integer, ForeignKey('base_schema.orders.id'), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(Date, nullable=False)
    payment_method = Column(String, nullable=False)

    order = relationship("Order", back_populates="payment")
