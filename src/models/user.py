from datetime import datetime

from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship, relationship

from fastapi_users.db import SQLAlchemyBaseUserTable

from .base_model import Base


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = 'users'
    
    email = Column(String(length=320), unique=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    hashed_password = Column(String(length=1024), nullable=False)
    role_id = Column(Integer, ForeignKey('base_schema.role.id'))
    role = relationship("Role")
    registered_at = Column(DateTime, default=datetime.now())
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    
    
class Role(Base):
    __tablename__ = 'role'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    