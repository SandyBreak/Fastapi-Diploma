# -*- coding: UTF-8 -*-
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base


class Client(Base):
    __tablename__ = 'clients'
    
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String(length=320), unique=True, index=True, nullable=False)

    orders = relationship("Order", back_populates="client")
    reviews = relationship("Review", back_populates="client")
