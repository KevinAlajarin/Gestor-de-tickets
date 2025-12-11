import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False # Ahorra memoria
    DEBUG = os.getenv("FLASK_ENV") == "development"
    
    VALID_CATEGORIES = ["Hardware", "Software", "Red"]
    VALID_STATUSES = ["Abierto", "En Progreso", "Resuelto"]