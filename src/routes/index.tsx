import { createBrowserRouter } from "react-router-dom"

import LoginPage from "@/features/auth/pages/LoginPage"
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"
import SetPasswordPage from "@/features/auth/pages/SetPasswordPaage"

import ProtectedRoute from "./ProtectedRoute"
import UnProtectedRoute from "./UnProtectedRoute"

import AppLayout from "@/layouts/AppLayout"

import ProfilePage from "@/features/profile/pages/ProfilePage"

import LiveQueuePage from "@/features/nurse/pages/LiveQueuePage"
import RegisterPatientPage from "@/features/nurse/pages/RegisterPatientPage"
import BookAppointmentPage from "@/features/nurse/pages/BookAppointmentPage"

import QueuePage from "@/features/doctor/pages/QueuePage"
import ConsultationPage from "@/features/doctor/pages/ConsultationPage"
import PatientHistoryPage from "@/features/doctor/pages/PatientHistoryPage"

import DashboardPage from "@/features/admin/pages/DashboardPage"
import StaffManagementPage from "@/features/admin/pages/StaffManagementPage"
import ManageSchedulePage from "@/features/admin/pages/ManageSchedulePage"

import RoleRedirect from "./RoleRedirect"
export const router = createBrowserRouter([
  {
    path: "/login",

    element: (
      <UnProtectedRoute>
        <LoginPage />
      </UnProtectedRoute>
    ),
  },

  {
    path: "/forgot-password",

    element: (
      <UnProtectedRoute>
        <ForgotPasswordPage />
      </UnProtectedRoute>
    ),
  },

  {
    path: "/reset-password",

    element: (
      <UnProtectedRoute>
        <ResetPasswordPage />
      </UnProtectedRoute>
    ),
  },

  {
    path: "/set-password",

    element: (
      <UnProtectedRoute>
        <SetPasswordPage />
      </UnProtectedRoute>
    ),
  },

  {
    path: "/",

    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <RoleRedirect />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      {
        path: "profile",

        element: <ProfilePage />,
      },

      {
        path: "staff-management",

        element: <StaffManagementPage />,
      },

      {
        path: "doctor-schedules",

        element: <ManageSchedulePage />,
      },

      {
        path: "nurse/live-queue",

        element: <LiveQueuePage />,
      },

      {
        path: "nurse/register-patient",

        element: <RegisterPatientPage />,
      },

      {
        path: "nurse/book-appointment",

        element: <BookAppointmentPage />,
      },

      {
        path: "doctor/queue",

        element: <QueuePage />,
      },

      {
        path: "doctor/consultation/:appointmentId",

        element: <ConsultationPage />,
      },

      {
        path: "doctor/patients/:patientId/history",

        element: <PatientHistoryPage />,
      },
    ],
  },
])
