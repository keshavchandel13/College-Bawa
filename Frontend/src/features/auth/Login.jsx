import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/auth/login.css";
import { AiFillGoogleCircle } from "react-icons/ai";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_LOGIN_API}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      login(data.user); // Save user data to context
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in localStorage
      localStorage.setItem("token", data.token); // Store token
      navigate("/home");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form method="POST" onSubmit={handleSubmit} autoComplete="on">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <p className="forgot-password">
          <Link to={"/forgetpassword"}> Forgot Password? </Link>
        </p>
        <div className="or-line">
          <span>OR</span>
        </div>

        {/* Google login button */}
        <Link to={"/google-login"}>
          {" "}
          <button type="button" className="google-button">
            <AiFillGoogleCircle style={{ fontSize: "40px" }} />
          </button>
        </Link>

        <p className="signup-link">
          <Link to={"/signup"}>Don't have an account? Sign up</Link>
        </p>
        <div className="footer-links">
          <a href="#">Terms and Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
