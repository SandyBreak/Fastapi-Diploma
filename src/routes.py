from fastapi import APIRouter

from .routers.database import router as database_router
from .routers.auth import router as auth_router

def get_apps_router():
    router = APIRouter()
    router.include_router(auth_router.router)
    router.include_router(database_router.router)
    return router

