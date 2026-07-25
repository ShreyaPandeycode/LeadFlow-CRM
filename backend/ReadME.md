# LeadFlow CRM

A production-inspired Lead Management CRM built using Go, Gin, PostgreSQL, React, TypeScript and Tailwind CSS.

---

## Features

### Authentication
- JWT Login
- Protected Routes
- Role-based Authentication (Admin)

### Lead Management
- Create Lead
- Update Lead
- Delete Lead
- View Leads
- Search Leads
- Status Filter
- Pagination

### Dashboard
- Dashboard Statistics
- Hot Leads
- Top Performers
- Recent Activities

### Activity Logging
- Lead Creation
- Lead Update
- Lead Delete

---

## Tech Stack

### Backend
- Go
- Gin
- GORM
- PostgreSQL
- JWT Authentication

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Axios
- React Hot Toast
- Lucide React

---

## Project Structure

Backend

```
controllers/
models/
repositories/
services/
middleware/
database/
```

Frontend

```
components/
pages/
services/
types/
```

---

## API Endpoints

Authentication

```
POST /api/login
```

Leads

```
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
```

Supports

- Pagination
- Search
- Status Filter

Dashboard

```
GET /api/dashboard/stats
GET /api/dashboard/hot-leads
GET /api/dashboard/top-performers
```

---

## Screens

- Login
- Dashboard
- Lead Management

---

## Installation

Backend

```bash
go mod tidy
go run main.go
```

Frontend

```bash
npm install
npm run dev
```

---

## Environment Variables

Backend

```
DATABASE_URL=
JWT_SECRET=
```

Frontend

```
VITE_API_URL=http://localhost:8080/api
```

---

## Future Improvements

- Charts using Recharts
- Role Based Permissions
- Lead Notes
- Email Integration
- Export Leads
- Reports Module
- Unit Tests
- Docker Deployment

---

## Built By

Shreya Pandey

GitHub

https://github.com/ShreyaPandeycode