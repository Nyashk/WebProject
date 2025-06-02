# 🎨 ARTFAIR - Платформа для художников

ARTFAIR - это современная веб-платформа для демонстрации и продажи художественных работ, состоящая из frontend-приложения на React и backend-сервера на Node.js/Express.

## 🌐 Live Demo
⚠️ Для полной функциональности необходимо запустить backend локально (см. раздел "Установка")

[Демо фронтенда на GitHub Pages](https://your-username.github.io/ARTFAIR)

## 🔧 Функциональность
- Аутентификация: Регистрация и вход пользователей
- Галерея работ: Просмотр, фильтрация и поиск произведений
- Детализация: Страницы с полной информацией о работах
- Социальные функции: Комментарии и лайки
- Личный кабинет: Профили художников и коллекции
- Загрузка работ: Система публикации новых произведений
- Адаптивный интерфейс: Оптимизация для всех устройств

## 🧰 Технологии

### Frontend:
- React 18
- React Router v6
- Context API + useReducer
- Axios для API-запросов
- CSS Modules
- FilePond для загрузки изображений

### Backend:
- Node.js 16+
- Express 4.x
- MySQL
- JWT аутентификация
- Multer для обработки файлов
- Bcrypt для хеширования паролей
- CORS

## 📦 Установка

1. Клонирование репозитория
```bash
git clone https://github.com/your-username/ARTFAIR.git
cd ARTFAIR
Установка зависимостей

bash
# Backend
cd back
npm install

# Frontend
cd ../artfair-front
npm install
Настройка окружения

Создайте файлы .env:

back/.env:

env
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
FILE_UPLOAD_PATH=./uploads
MAX_FILE_UPLOAD=10
artfair-front/.env:

env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXX-X
🚀 Запуск
Разработка:

bash
# Backend
cd back
npm run dev

# Frontend (в другом терминале)
cd ../artfair-front
npm start
Продакшен:

bash
# Сборка фронтенда
cd artfair-front
npm run build

# Запуск сервера
cd ../back
npm start

🌐 Деплой
Frontend на GitHub Pages

bash
cd artfair-front
npm run deploy
Backend на Heroku/Vercel

📂 Структура проекта
Frontend:

artfair-front/
├── src/
│   ├── api/        # API клиенты
│   ├── assets/     # Статические файлы
│   ├── components/ # UI компоненты
│   ├── pages/      # Страницы приложения
│   ├── context/    # Глобальное состояние
│   └── styles/     # Глобальные стили
Backend:

back/
├── controllers/    # Логика обработки запросов
├── models/         # Схемы MongoDB
├── routes/         # Маршруты API
├── middleware/     # Промежуточное ПО
└── uploads/        # Загруженные файлы
❗️ Особенности
Все загружаемые файлы сохраняются в back/uploads/


💡 Авторы
Грисевич ЕКатерина 
