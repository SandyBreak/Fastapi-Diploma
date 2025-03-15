FROM python:3.11

WORKDIR /app

# Копируем только зависимости для кэширования
COPY ./requirements.txt /app/requirements.txt

# Установка зависимостей
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Копируем оставшуюся часть проекта
COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug", "--use-colors"]
