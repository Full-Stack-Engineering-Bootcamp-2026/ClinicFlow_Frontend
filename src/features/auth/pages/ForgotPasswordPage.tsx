import AuthLayout from "../components/AuthLayout"

function ForgotPasswordPage() {
  return (
    <AuthLayout
      pageTitle="Forgot Password"
      title="Reset your password"
      subtitle="Enter your email to receive reset instructions"
      backTo="/login"
      backLabel="Go back to login"
    >
      <div>Form</div>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
