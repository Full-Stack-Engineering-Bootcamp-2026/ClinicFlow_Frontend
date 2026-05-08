import { createBrowserRouter } from "react-router-dom"

import LoginPage from "@/features/auth/pages/LoginPage"
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"

import ProtectedRoute from "./ProtectedRoute"
import UnProtectedRoute from "./UnProtectedRoute"
import AppLayout from "@/layouts/AppLayout"
import ProfilePage from "@/features/profile/pages/ProfilePage";
import LiveQueuePage from "@/features/nurse/pages/LiveQueuePage"
import RegisterPatientPage from "@/features/nurse/pages/RegisterPatientPage"
import BookAppointmentPage from "@/features/nurse/pages/BookAppointmentPage"

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
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
      {
        path: "/nurse/book-appointment",
        element: <BookAppointmentPage />,
      },
      {
        path: "/nurse/live-queue",
        element: <LiveQueuePage />,
      },
      {
        path: "/nurse/register-patient",
        element: <RegisterPatientPage />,
      },
      {
        path:"profile",
        element: <ProfilePage />
      }
    ],
  },
])
