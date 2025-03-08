import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'

export default function LoginWithGoogle() {
  const responseGoogle = async(authResult)=>{
    try{
      console.log(authResult);

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
