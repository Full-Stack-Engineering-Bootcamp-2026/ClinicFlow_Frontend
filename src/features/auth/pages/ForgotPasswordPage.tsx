import AuthLayout from "../components/AuthLayout"
import ForgotPasswordForm from "../components/ForgotPasswordForm"

function ForgotPasswordPage() {
  return (
    <AuthLayout
      pageTitle="Forgot Password"
      title="Reset your password"
      subtitle="Enter your email to receive reset instructions"
      backTo="/login"
      backLabel="Go back to login"
    >
      <ForgotPasswordForm/>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
