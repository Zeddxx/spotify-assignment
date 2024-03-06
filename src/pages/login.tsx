/**
 * route /Login
 */

import { useEffect } from "react";
import LoginButton from "@/components/auth/login-button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Checking if token exists in LocalStorage
    const getToken = localStorage.getItem("accessToken");
    if (!getToken) return;
    navigate("/home");
  }, [navigate]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="space-y-5 w-full flex flex-col items-center max-w-lg">
        <img src="/assets/logo.svg" alt="Icon" className="h-20 mx-auto w-20" />
        <LoginButton className="w-full capitalize rounded-full max-w-xs mx-auto" />
        <p className="text-muted-foreground text-sm">Login to set token</p>
      </div>
    </div>
  );
};
export default Login;
