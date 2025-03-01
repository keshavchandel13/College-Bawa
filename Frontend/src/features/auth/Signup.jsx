import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/auth/signup.css'
function Signup() {
  return (
<div className='signup'>
      <div className="signup-container">
        <form action="" method="post">
          {/* Input box for signup */}
          <input type="text" name="name" placeholder='Name'/>
          <input type="email" name="email" placeholder='Email' />
          <input type="password" name="password" placeholder='Password' />
          <input type="password" name="confirmPass" placeholder='Confirm Password' />
          <button type="submit">Signup</button>
        </form>
        <hr />OR <hr />
        {/* Google auth button */}
        <button>Google auth</button>
        {/* Extra Button */}
        <p>Already a User? <Link to="/login">Login</Link></p> {/* Fixed link */}
        {/* End of signup */}
        <div>
          <p>Terms & Conditions</p>
          <p>Support</p>
          <p>Customer Care</p>
        </div>
      </div>
    </div>
  );
}

export default Register
