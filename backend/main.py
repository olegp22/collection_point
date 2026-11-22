from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Список адресов, с которых можно делать запросы (пока локально)
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
     "http://127.0.0.1:5500", # если использует Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Разрешаем все методы (GET, POST, PUT, DELETE)
    allow_headers=["*"], # Разрешаем все заголовки (включая Authorization)
)