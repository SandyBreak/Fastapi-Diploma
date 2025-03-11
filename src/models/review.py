# -*- coding: UTF-8 -*-
from sqlalchemy import Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .base_model import Base

class Review(Base):
    __tablename__ = 'reviews'
    
    client_id: Mapped[int] = mapped_column(Integer, ForeignKey('base_schema.clients.id'), nullable=False)
    service_id: Mapped[int] = mapped_column(Integer, ForeignKey('base_schema.services.id'), nullable=False)
    review_date: Mapped[Date] = mapped_column(String, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    text: Mapped[str] = mapped_column(String, nullable=False)

    client = relationship("Client", back_populates="reviews")
    service = relationship("Service", back_populates="reviews")
