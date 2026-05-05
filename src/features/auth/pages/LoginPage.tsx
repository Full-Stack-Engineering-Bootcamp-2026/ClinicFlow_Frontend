
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      subtitle="Enter your credentials to continue"
      pageTitle="User Login"
    >
      <LoginForm/>
    </AuthLayout>
  );
}