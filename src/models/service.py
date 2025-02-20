# -*- coding: UTF-8 -*-
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship

from .base_model import Base

class Service(Base):
    __tablename__ = 'services'
    
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)

    orders = relationship("Order", back_populates="service")
    reviews = relationship("Review", back_populates="service")
