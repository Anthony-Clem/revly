import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/auth/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <AuthCard
      title="Create your account"
      description="Register to start keeping track of yout feedback!"
      redirectLink="/auth/login"
      redirectQuestion="Already have an account?"
      redirectText="Login"
    >
      <RegisterForm />
    </AuthCard>
  );
};

export default RegisterPage;
