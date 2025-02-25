# -*- coding: UTF-8 -*-
from fastapi import Depends, APIRouter

from .config import fastapi_users, current_active_user
from .config import auth_backend

from src.schemas.fastapi_users import UserRead, UserUpdate
from src.models.user import User

router = APIRouter(prefix='',)

router.include_router(
    fastapi_users.get_auth_router(auth_backend), 
        prefix="/auth/jwt",
        tags=["auth"],
    )

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users", 
    tags=["users"],
)

@router.get("/authenticated-route", tags=["auth"])
async def get_authenticated_route(user: User = Depends(current_active_user)):
    return {"Authorized User Name": f"{user.username}"}