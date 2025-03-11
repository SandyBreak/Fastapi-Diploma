# -*- coding: UTF-8 -*-
from sqlalchemy import Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .base_model import Base

class Payment(Base):
    __tablename__ = 'payments'
    
    order_id: Mapped[int] = mapped_column(Integer, ForeignKey('base_schema.orders.id'), nullable=False)
    amount: Mapped[float] = mapped_column(Float, nullable=False)
    payment_date: Mapped[Date] = mapped_column(String, nullable=False)
    payment_method: Mapped[str] = mapped_column(String, nullable=False)

    order = relationship("Order", back_populates="payment")
