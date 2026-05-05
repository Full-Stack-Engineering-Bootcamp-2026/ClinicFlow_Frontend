import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";
import ProtectedHome from "@/features/auth/components/ProtectedHome";

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
        <ProtectedHome/>
      </ProtectedRoute>
    ),
  },
]);