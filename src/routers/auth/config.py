# -*- coding: UTF-8 -*-
from fastapi_users.authentication import (BearerTransport, AuthenticationBackend, JWTStrategy)
from fastapi_users import FastAPIUsers

from src.repositories.user_manager import get_user_manager
from src.models.user import User

from config.env_config import PRIVATE_KEY, PUBLIC_KEY, ACCESS_TOKEN_LIFETIME


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=PRIVATE_KEY, 
        lifetime_seconds=ACCESS_TOKEN_LIFETIME,
        algorithm="RS256",
        public_key=PUBLIC_KEY,
    )
auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, int](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)