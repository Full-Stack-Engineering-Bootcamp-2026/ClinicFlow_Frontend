import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";
import AppLayout from "@/layouts/AppLayout";

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
    element:
        <ProtectedRoute>
        <AppLayout />
        </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>, 
      },
      {
        path: "patients",
        element: <div>Patients Page</div>,
      },
      {
        path: "appointments",
        element: <div>Appointments Page</div>,
      },
    ],
  },
]);