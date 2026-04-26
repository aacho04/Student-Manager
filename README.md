
# Student Manager (Full-Stack + Java Analytics)

Student Manager is a full-stack starter project with:

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express + Mongoose
- Java Service: Spring Boot REST analytics service
- Database: MongoDB

## Project Structure

```
Student-Manager/
  frontend/          # React dashboard UI
  backend/           # Express API + MongoDB
  java-service/      # Spring Boot analytics service
```

## MVP Features Included

- Student management (add, edit, delete, list)
- Attendance tracking (mark present/absent + history)
- Grades management (subject-wise marks + average)
- Java analytics integration for grade classification and reports
- Dashboard UI with sidebar navigation and responsive cards/tables

## Quick Start

### 1) Start Java Analytics Service

```bash
cd java-service
mvn spring-boot:run
```

Runs on `http://localhost:8081`.

### 2) Start Node Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Runs on `http://localhost:5000`.

### 3) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## Environment Variables

Backend `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_manager
JAVA_SERVICE_URL=http://localhost:8081
```

Frontend `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Notes

- Profile photos are stored as URL strings in MVP.
- Sorting/filtering are implemented in reusable table component.
- Fee and report pages are scaffolded and connected to backend endpoints.
