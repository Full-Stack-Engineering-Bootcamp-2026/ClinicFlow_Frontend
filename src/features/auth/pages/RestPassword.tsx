import AuthLayout from "../components/AuthLayout"


function RestPassword() {
  return (
    <AuthLayout
      pageTitle="Reset Password"
      title="Create new password"
      subtitle="Enter your new password below"
      backTo="/login"
    >
      <div>Form</div>
    </AuthLayout>
  )
}

export default RestPassword
