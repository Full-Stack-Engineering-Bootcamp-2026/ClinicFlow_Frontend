# ClinicFlow Frontend

<div align="center">

### React Frontend for the ClinicFlow Healthcare Workflow System

Built with React, TypeScript, Redux Toolkit, Tailwind CSS, and Role-Based Workflows.

</div>

---

## About

ClinicFlow Frontend is the client-side application for the ClinicFlow healthcare workflow management system.

It provides dedicated interfaces and workflows for:

- Admin
- Nurse
- Doctor

The frontend is focused on real clinic operations and role-based user experience.

It handles:

- Authentication and protected routing
- Role-based dashboards
- Staff management UI
- Doctor schedule management
- Patient registration
- Appointment booking
- Live queue monitoring
- Consultation workflows
- Prescription management
- Patient history viewing
- Profile and profile photo management

The frontend is built using a modular feature-based architecture with reusable UI components, centralized state management, and typed API communication.

---

## Main Roles

The system supports three main roles:

| Role | Responsibility |
|---|---|
| ADMIN | Manages staff, schedules, leave, and clinic operations |
| NURSE | Registers patients, books appointments, manages queue |
| DOCTOR | Handles consultations, prescriptions, and patient history |

The frontend dynamically renders pages, routes, navigation, and permissions based on the logged-in user's role.

---

## Core Features

- JWT-based authentication flow
- Role-based protected routing
- Persistent login using Redux Persist
- Admin dashboard and statistics
- Staff creation and management
- Doctor schedule and leave management
- Patient registration workflow
- Appointment booking workflow
- Real-time style queue management
- Doctor consultation pages
- Prescription and medicine forms
- Patient history timeline
- Profile update and photo upload
- Form validation using Zod
- Toast notifications for user feedback
- Reusable UI component architecture

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| State Management | Redux Toolkit |
| Persistence | Redux Persist |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Forms | React Hook Form |
| Validation | Zod |
| HTTP Client | Axios + Fetch |
| Notifications | React Toastify + Sonner |
| Icons | lucide-react |

---

## Frontend Architecture

```text
Pages
   ↓
Feature Components
   ↓
Custom Hooks
   ↓
API Services
   ↓
Axios Client / Fetch
   ↓
Backend APIs
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Pages | Main route-level screens |
| Components | Reusable UI building blocks |
| Hooks | State handling and business logic |
| Services | API communication |
| Store | Global authentication and app state |
| Routes | Protected and role-based navigation |

---

## Project Structure

```text
ClinicFlow_Frontend/
  src/

    app/                 Redux store configuration

    components/ui/       Reusable UI components

    features/
      admin/             Dashboard, staff, schedules
      auth/              Login and password flows
      doctor/            Queue, consultation, history
      nurse/             Patient and appointment workflows
      profile/           Profile management

    hooks/               Shared reusable hooks

    layouts/             Sidebar, navbar, app layout

    lib/                 Axios client and utilities

    routes/              Protected routing logic

    types/               Shared TypeScript types

    utils/               Helper functions
```

---

## Main Frontend Modules

| Module | Purpose |
|---|---|
| Authentication | Login and password setup/reset |
| Admin Dashboard | Clinic statistics and quick actions |
| Staff Management | Add/filter/deactivate staff |
| Doctor Schedules | Manage doctor availability |
| Nurse Queue | Patient and appointment flow |
| Doctor Queue | Consultation workflow |
| Patient History | Previous consultation records |
| Profile | User profile and photo management |

---

## Role-Based Routing

The frontend protects routes using authentication and role validation.

### Public Routes

| Route |
|---|
| /login |
| /forgot-password |
| /reset-password |
| /setup-password |

### Admin Routes

| Route |
|---|
| /dashboard |
| /staff-management |
| /doctor-schedules |

### Nurse Routes

| Route |
|---|
| /nurse/register-patient |
| /nurse/book-appointment |
| /nurse/live-queue |

### Doctor Routes

| Route |
|---|
| /doctor/queue |
| /doctor/consultation/:appointmentId |
| /doctor/patients/:patientId/history |

### Shared Protected Route

| Route |
|---|
| /profile |

---

## Authentication Flow

```text
User Login
   ↓
Frontend sends credentials
   ↓
Backend validates user
   ↓
JWT token returned
   ↓
Redux stores token + user data
   ↓
Redux Persist saves session
   ↓
Axios interceptor attaches token
   ↓
Protected APIs become accessible
```

---

## State Management

Redux Toolkit is used for:

- Authentication state
- User profile data
- Persistent login session
- Global application state

Redux Persist keeps the user logged in after refresh.

---

## Form Validation

Forms are validated using:

- React Hook Form
- Zod schema validation

Examples:

- Required fields
- Email validation
- Password validation
- Date validation
- Schedule validation
- Appointment validation

Validation errors are displayed inline for better UX.

---

## Important UI Workflows

### Add Staff Flow

```text
Admin opens Add Staff dialog
   ↓
Frontend loads role dropdown
   ↓
Form validation runs
   ↓
POST request sent
   ↓
Success toast shown
   ↓
Staff table refreshes
```

### Appointment Booking Flow

```text
Nurse searches patient
   ↓
Selects doctor
   ↓
Chooses appointment date
   ↓
Backend validates availability
   ↓
Queue number generated
   ↓
Booking success displayed
```

### Consultation Flow

```text
Doctor opens queue dashboard
   ↓
Calls next patient
   ↓
Opens consultation page
   ↓
Adds diagnosis and medicines
   ↓
Completes consultation
   ↓
Consultation becomes locked
```

---

## API Communication

The frontend communicates with the backend using:

- Axios instance with JWT interceptor
- Feature-based service files
- Typed request/response DTOs

Example flow:

```text
Page
   ↓
Hook
   ↓
Service
   ↓
Axios Client
   ↓
Backend API
```

---

## Environment Variables

```text
VITE_API_BASE_URL=http://localhost:8080
```

---

## Running the Frontend

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Useful Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

---

## UI Design Goals

The frontend was designed to focus on:

- Clean workflow navigation
- Minimal confusion for clinic staff
- Fast data entry
- Clear queue visibility
- Reusable UI patterns
- Role-specific interfaces
- Responsive layouts

---

## Engineering Challenges Solved

- Managing multiple role-based frontend flows
- Keeping authentication persistent securely
- Building reusable form/dialog systems
- Coordinating queue lifecycle visually
- Handling large modular frontend structure
- Typed API integration with backend DTOs
- Dynamic sidebar rendering based on role

---

## Future Improvements

- WebSocket live queue updates
- Dark mode support
- Dashboard analytics charts
- Mobile responsive optimization
- Skeleton loading states
- End-to-end testing
- Docker deployment support

---

## Related Repository

Backend Repository:

```text
https://github.com/Full-Stack-Engineering-Bootcamp-2026/ClientFlow_Backend
```

---

## Author

Built by Jayraj Gajul, Chetan Asane, and Rishita Pathak as a role-based healthcare workflow management system focused on real-world clinic operations, queue management, consultations, and full-stack application architecture.
