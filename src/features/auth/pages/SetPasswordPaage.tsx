import AuthLayout from "../components/AuthLayout"

import SetPasswordForm from "../components/SetPasswordForm"

export default function SetPasswordPage() {
  return (
    <AuthLayout
      pageTitle="Security Update"
      title="Security Update"
      subtitle="Please create a secure new password for your ClinicFlow account"
    >
      <SetPasswordForm />
    </AuthLayout>
  )
}