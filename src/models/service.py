# -*- coding: UTF-8 -*-
from sqlalchemy import String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base

class Service(Base):
    __tablename__ = 'services'
    
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[Float] = mapped_column(Float, nullable=False)

    orders = relationship("Order", back_populates="service")
    reviews = relationship("Review", back_populates="service")
