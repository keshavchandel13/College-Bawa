import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const data = await loginWithGoogle(credentialResponse.credential);
      console.log("Google login success:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome to College Bawa</h2>
      <p>Please log in or sign up to continue.</p>

      <div className="auth-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Sign Up</button></Link>
      </div>

      <div className="google-login">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Google Login Failed")} />
      </div>
    </div>
  );
};

export default AuthPage;
