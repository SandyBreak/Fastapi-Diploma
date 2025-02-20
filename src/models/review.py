# -*- coding: UTF-8 -*-
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from .base_model import Base

class Review(Base):
    __tablename__ = 'reviews'
    

    client_id = Column(Integer, ForeignKey('base_schema.clients.id'), nullable=False)
    service_id = Column(Integer, ForeignKey('base_schema.services.id'), nullable=False)
    review_date = Column(Date, nullable=False)
    rating = Column(Integer, nullable=False)
    text = Column(String, nullable=False)

    client = relationship("Client", back_populates="reviews")
    service = relationship("Service", back_populates="reviews")
