import React from 'react'
import LoginForm from "./LoginForm"
import useAuth from '../hooks/useAuth'

const Login = () => {
  const { auth } = useAuth()

  return (
    <>
      <div>
        {auth.username ?
          (<>
            <div align="center">
              <br></br>
              <br></br>
              <h1>Already Logged in.</h1>
              <br></br>
              <h3>If you wish to login to another account, please logout first.</h3>
              <br></br>
              <br></br>
            </div>
          </>) : (<>
                <div align="center">
                  <br></br>
                  <br></br>
                  <h1>Login</h1>
                  <br></br>
                  <br></br>
                </div>
                <LoginForm />
                <br></br>
                <br></br>
              </>)}
      </div>
    </>
  )
}

export default Login