# -*- coding: UTF-8 -*-
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship

from .base_model import Base


class Client(Base):
    __tablename__ = 'clients'
    
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    registration_date = Column(Date, nullable=False)

    orders = relationship("Order", back_populates="client")
    reviews = relationship("Review", back_populates="client")
