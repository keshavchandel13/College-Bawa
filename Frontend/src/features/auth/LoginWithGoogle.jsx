import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const LoginWithGoogle = () => {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={(response) => {
        console.log(response);
        loginWithGoogle(response);
        navigate("/dashboard");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default LoginWithGoogle;
