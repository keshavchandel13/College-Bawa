import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { authInputBase, authButtonBase, authHeadingBase, authLinkBase } from "../../styles/authClasses";

const signupCardBase = `
  bg-transparent
  p-[30px] rounded-xl text-center
  w-[350px] max-w-full
  mr-[4%] ml-auto
  relative
  border border-white/25
  shadow-[0_15px_30px_rgba(0,255,255,0.3),0_20px_40px_rgba(255,0,255,0.25)]
  [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)_rotateZ(1deg)]
  transition-all duration-400 ease-in-out
  hover:[transform:perspective(1200px)_rotateX(3deg)_rotateY(-3deg)_rotateZ(0deg)_translateY(-10px)]
  hover:shadow-[0_18px_40px_rgba(0,255,255,0.4),0_22px_50px_rgba(255,0,255,0.35),inset_0_5px_15px_rgba(255,255,255,0.15)]
  max-lg:mx-auto max-lg:w-[90%] max-lg:max-w-[400px] max-lg:[transform:none]
  max-lg:shadow-[0_8px_16px_rgba(255,255,255,0.2)]
`;

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters long."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/signup`, {
        method: "POST", mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) navigate("/login");
      else setError(data.message || "Signup failed. Please try again.");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  return (
    <div className="
      flex justify-end items-center h-screen pr-[4%]
      bg-[url('/Signup.png')] bg-cover bg-center
      max-lg:justify-center max-lg:bg-black max-lg:bg-none max-lg:pr-0
    ">
      <div className={signupCardBase}>
        <h2 className={`${authHeadingBase} text-left`}>Signup</h2>
        <h6 className="text-white/70 mb-5 text-left text-sm">Just Some Details To Get You In</h6>

        {error && <div className="text-red-500 text-sm px-2.5 py-2 rounded my-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input type="text"     name="name"            placeholder="Name"             value={name}            onChange={handleChange} required className={authInputBase} />
          <input type="email"    name="email"           placeholder="Email"            value={email}           onChange={handleChange} required className={authInputBase} />
          <input type="password" name="password"        placeholder="Password"         value={password}        onChange={handleChange} required className={authInputBase} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword}  onChange={handleChange} required className={authInputBase} />
          <button
            type="submit"
            className={`${authButtonBase} bg-gradient-to-r from-[#00eaff] via-[#8740CD] to-[#ff00ff] mt-2`}
          >
            Sign Up
          </button>
        </form>

        <p className="my-2.5">
          <Link to="/forgetpassword" className={authLinkBase}>Forgot Password?</Link>
        </p>

        <div className="my-2.5">
          <span className="text-white/70">OR</span>
        </div>

        <Link to="/google-login">
          <button
            type="button"
            className="
              w-[60px] h-[60px] rounded-full border-none bg-transparent
              flex items-center justify-center cursor-pointer mx-auto my-5
              shadow-[0_5px_14px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,255,255,0.4),0_6px_18px_rgba(255,0,255,0.3)]
              hover:bg-white/10 hover:scale-110
              hover:shadow-[0_8px_22px_rgba(0,255,255,0.5),0_10px_25px_rgba(255,0,255,0.4)]
              transition-all duration-300
            "
          >
            <AiFillGoogleCircle style={{ fontSize: "40px" }} />
          </button>
        </Link>

        <p className="my-2.5">
          <Link to="/login" className="text-[#ff00ff] no-underline hover:underline hover:text-cyan-400 transition-colors duration-300">
            Already Registered? Login
          </Link>
        </p>

        <div className="mt-5 text-xs text-white/70 space-x-2.5">
          <Link to="/terms"         className={authLinkBase}>Terms and Conditions</Link>
          <Link to="/support"       className={authLinkBase}>Support</Link>
          <Link to="/customer-care" className={authLinkBase}>Customer Care</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;