import React from 'react'
<link rel="stylesheet" href="login.css" />
import "../../styles/auth/login.css"
function Login() {
  return (
    <div className='login-page'>
        <div className="container">
          <h2>Login</h2>
          <input type="email" name="email" id="" placeholder='Email' />
          <input type="password" name="password" id="" placeholder='Password'/>
          <button type="button"> Login</button>
          <button type="button">Forgot password?</button>
        </div>
      
    </div>
    
  )
}

export default Login
