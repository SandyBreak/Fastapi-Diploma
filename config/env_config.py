from dotenv import load_dotenv
import os

load_dotenv()

SMARTCAPTCHA_SERVER_KEY = os.environ.get('SMARTCAPTCHA_SERVER_KEY')
PRIVATE_KEY = os.environ.get('PRIVATE_KEY')
PUBLIC_KEY = os.environ.get('PUBLIC_KEY')