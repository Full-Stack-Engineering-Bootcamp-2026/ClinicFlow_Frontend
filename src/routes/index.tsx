import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/RestPasswordPage";
import AppLayout from "@/components/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },

  {
    path: "/",
    element: <AppLayout />,
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