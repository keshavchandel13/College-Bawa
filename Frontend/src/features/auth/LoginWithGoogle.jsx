import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../../api/auth';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const {login} =useAuth()
  const responseGoogle = async(authResult)=>{
    try{
      if(authResult['code']){
        const result = await googleAuth(authResult['code']);
        const {email, name} = result.data.user;
        const token = result.data.token;
        const obj = {email, name, token};
        localStorage.setItem('user', JSON.stringify(obj));
        login (obj);
        navigate('/home')
      }

    } catch(err){
      console.error('Error while requesting google code: ', err);

    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
  })
  return (
    <div>
      <button onClick={googleLogin}>login</button>
    </div>
  )
}
