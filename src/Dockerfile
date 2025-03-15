FROM python:3.11 as requirements-stage

WORKDIR /tmp

# Установка Poetry по официальной инструкции
#RUN curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry

#COPY ./pyproject.toml ./poetry.lock* /tmp/

# Корректная команда для экспорта
#RUN poetry export --without-hashes --format=requirements.txt --output=requirements.txt


FROM python:3.11

WORKDIR /app

COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug", "--use-colors"]
