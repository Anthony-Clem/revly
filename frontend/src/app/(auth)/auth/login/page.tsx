import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <AuthCard
      title="Welcome to revly"
      description="Please log in to continue"
      redirectLink="/auth/register"
      redirectQuestion="Don't have an account?"
      redirectText="Register"
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
