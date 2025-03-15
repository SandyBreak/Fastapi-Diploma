import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.project_config import settings

from src.routes import get_apps_router

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



async def startup_event():
    logger.info("Приложение запущено")

async def shutdown_event():
    logger.info("Приложение остановлено")
    
def get_application() -> FastAPI:
    application = FastAPI(
        title=settings.PROJECT_NAME,
        debug=settings.DEBUG,
        version=settings.VERSION
    )

    application.include_router(get_apps_router())
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    return application


app = get_application() 


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", reload=True)
