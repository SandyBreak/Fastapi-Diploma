# -*- coding: UTF-8 -*-
from fastapi import Depends

from fastapi_users.db import SQLAlchemyUserDatabase

from sqlalchemy.ext.asyncio import AsyncSession

from config.database.db_helper import db_helper

from src.models.user import User

async def get_user_db(session: AsyncSession = Depends(db_helper.get_scope_session)):
    async with session() as db_session:
        yield SQLAlchemyUserDatabase(db_session, User)