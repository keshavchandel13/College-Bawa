import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiFillGoogleCircle } from "react-icons/ai";

// Shared card + input styles extracted as constants for reuse
const cardBase = `
  bg-transparent
  p-[30px] rounded-xl text-center
  w-[350px] max-w-full
  ml-[-30px] mr-[4%]
  relative
  border border-white/25
  shadow-[0_15px_30px_rgba(0,255,255,0.3),0_20px_40px_rgba(255,0,255,0.25)]
  [transform:perspective(1200px)_rotateX(6deg)_rotateY(-6deg)_rotateZ(1deg)]
  transition-all duration-400 ease-in-out
  hover:[transform:perspective(1200px)_rotateX(3deg)_rotateY(-3deg)_rotateZ(0deg)_translateY(-10px)]
  hover:shadow-[0_18px_40px_rgba(0,255,255,0.4),0_22px_50px_rgba(255,0,255,0.35),inset_0_5px_15px_rgba(255,255,255,0.15)]
  after:content-[''] after:absolute after:bottom-[-18px] after:left-1/2
  after:w-[90%] after:h-[14px]
  after:bg-black/90 after:rounded-full
  after:-translate-x-1/2 after:blur-[10px] after:opacity-70
  max-lg:ml-auto max-lg:mr-auto max-lg:w-[90%] max-lg:max-w-[400px]
  max-lg:[transform:none] max-lg:text-center
`;

const inputBase = `
  w-full px-3 py-3 my-2.5 rounded-md
  border border-white/40
  bg-black/30 text-white
  placeholder-white/60
  transition-all duration-300 ease-in-out
  focus:outline-none focus:border-cyan-400
  focus:shadow-[0_5px_15px_rgba(0,255,255,0.5)]
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters long."); return; }
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST", mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Failed to login");
      const data = await response.json();
      login(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("profileImage", data.user.profileImage);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  return (
    <div className="
      flex justify-end items-center h-screen
      bg-[url('/Login.png')] bg-cover bg-center
      max-lg:justify-center max-lg:relative
      max-lg:before:content-[''] max-lg:before:absolute max-lg:before:inset-0
      max-lg:before:bg-[url('/smallerdevies.png')] max-lg:before:bg-cover max-lg:before:bg-center
      max-lg:before:z-[1]
      [&>*]:relative [&>*]:z-[2]
    ">
      <div className={cardBase}>
        {/* Title */}
        <h2 className="
          text-2xl mb-5 text-white text-left
          [text-shadow:0px_2px_8px_rgba(255,255,255,0.15)]
          max-lg:text-[28px] max-lg:font-bold max-lg:text-center max-lg:uppercase max-lg:tracking-[2px]
          max-lg:[text-shadow:0_0_8px_rgba(0,255,255,0.6),0_0_15px_rgba(255,0,255,0.5),0_0_25px_rgba(255,255,255,0.4)]
        ">
          Login
        </h2>

        {error && <div className="text-[#FF4500] px-2.5 py-2.5 rounded my-2.5">{error}</div>}

        <form method="POST" onSubmit={handleSubmit} autoComplete="on">
          <input type="email" name="email" value={email} placeholder="Email" required onChange={handleChange} className={inputBase} />
          <input type="password" name="password" value={password} placeholder="Password" required onChange={handleChange} className={inputBase} />
          <button
            type="submit"
            className="
              w-full py-3 text-base rounded-md border-none cursor-pointer
              bg-gradient-to-r from-[#00eaff] via-[#8740CD] to-[#ff00ff]
              text-white font-medium
              shadow-[0_7px_18px_rgba(0,0,0,0.6),0_5px_20px_rgba(0,255,255,0.4),0_6px_22px_rgba(255,0,255,0.3)]
              hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,255,255,0.5),0_12px_28px_rgba(255,0,255,0.4)]
              active:translate-y-0.5 active:shadow-[0_3px_8px_rgba(0,0,0,0.4)]
              transition-all duration-300
            "
          >
            Login
          </button>
        </form>

        <p className="my-2.5">
          <Link to="/forgetpassword" className="text-white/70 no-underline hover:text-cyan-400 transition-colors duration-300">
            Forgot Password?
          </Link>
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
          <Link to="/signup" className="text-[#ff00ff] no-underline hover:underline hover:text-cyan-400 transition-colors duration-300">
            Don't have an account? Sign up
          </Link>
        </p>

        <div className="mt-5 text-xs text-white/70 space-x-2.5">
          <a href="#" className="text-white/70 no-underline hover:text-cyan-400 transition-colors duration-300">Terms and Conditions</a>
          <a href="#" className="text-white/70 no-underline hover:text-cyan-400 transition-colors duration-300">Support</a>
          <a href="#" className="text-white/70 no-underline hover:text-cyan-400 transition-colors duration-300">Customer Care</a>
        </div>
      </div>
    </div>
  );
}

export default Login;