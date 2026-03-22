import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authCardBase, authInputBase, authButtonBase, authHeadingBase, authLinkBase } from "../../styles/authClasses";

function ForgetPassword({ setOtpRequested }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setEmail(e.target.value);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) { setError("Invalid email address"); return; }
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/forget-password`, {
        method: "POST", mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpRequested(true);
        localStorage.setItem("otpRequested", "true");
        navigate("/reset-password");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to send request");
    }
  };

  return (
    <div className="
      flex justify-end items-center h-screen
      bg-[url('/Login.png')] bg-cover bg-center
      max-lg:justify-center max-lg:relative
      max-lg:before:content-[''] max-lg:before:absolute max-lg:before:inset-0
      max-lg:before:bg-[url('/smallerdevies.png')] max-lg:before:bg-cover
      max-lg:before:z-[1]
      [&>*]:relative [&>*]:z-[2]
    ">
      <div className={authCardBase}>
        <h2 className={`${authHeadingBase} text-left`}>Forgot Password?</h2>
        <h6 className="text-white/70 mb-5 text-left text-sm">Please enter your email</h6>

        {error && <div className="text-red-500 px-2.5 py-2.5 rounded my-2.5 text-sm">{error}</div>}

        <form method="POST" onSubmit={handleSubmit}>
          <input
            type="email" name="forgottenemail" value={email}
            onChange={handleChange} placeholder="Enter your email" required
            className={authInputBase}
          />
          <button
            type="submit"
            className={`${authButtonBase} bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] mt-2`}
          >
            Reset Password
          </button>
        </form>

        <p className="mt-2.5 mb-[90px]">
          <Link to="/login" className={authLinkBase}>Back to Login</Link>
        </p>

        <p className="my-2.5">
          <Link to="/signup" className="text-[#ff00ff] no-underline hover:underline hover:text-cyan-400 transition-colors duration-300">
            Don't have an account? Sign up
          </Link>
        </p>

        <div className="mt-5 text-xs text-white/70 space-x-2.5">
          <a href="#" className={authLinkBase}>Terms and Conditions</a>
          <a href="#" className={authLinkBase}>Support</a>
          <a href="#" className={authLinkBase}>Customer Care</a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;