import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = () => {
    const [mode,setMode] = useState("login")
  return (
    <div>
      <div className="container_box">
        {
            mode ==="login"?<LoginForm/>:<RegisterForm/>
        }
      </div>
    </div>
  )
}

export default Auth
