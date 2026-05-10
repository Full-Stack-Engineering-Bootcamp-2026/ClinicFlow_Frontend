import AuthLayout from "../components/AuthLayout"
import ResetPasswordForm from "../components/ResetPasswordForm"


function ResetPasswordPage() {
  return (
    <AuthLayout
      pageTitle="Reset Password"
      title="Create new password"
      subtitle="Enter your new password below"
      backTo="/login"
    >
      <ResetPasswordForm/>
    </AuthLayout>
  )
}

export default ResetPasswordPage
