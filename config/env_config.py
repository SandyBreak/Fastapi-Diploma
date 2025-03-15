from dotenv import load_dotenv
import os

load_dotenv()

PRIVATE_KEY = os.environ.get('PRIVATE_KEY')
PUBLIC_KEY = os.environ.get('PUBLIC_KEY')
MANAGER_SECRET = os.environ.get('MANAGER_SECRET')
ACCESS_TOKEN_LIFETIME = os.environ.get('ACCESS_TOKEN_LIFETIME')