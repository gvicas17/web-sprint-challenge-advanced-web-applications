import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialValue = {
    username: '',
    password: ''
  }

  const [login, setLogin] = useState(initialValue)

  const handleChanges = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault()

    axiosWithAuth()
    .post('/api/login', login)
    .then(res => {
      window.localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => {console.log(err)})

    setLogin({
      username: '',
      password: ''
    })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit = {onSubmit}>
        <label>Username:
            <input
              type = 'text'
              name = 'username'
              value = {login.username}
              onChange = {handleChanges}
            />
        </label>
        <label>Password:
            <input
              type = 'password'
              name = 'password'
              value = {login.password}
              onChange = {handleChanges}
            />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
