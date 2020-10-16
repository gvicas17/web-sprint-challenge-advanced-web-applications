import React, {useState} from "react";
import axios from 'axios'


const initialCredentials = {
  username: "",
  password: ""
}

const Login = (props) => {

  const [credentials, setCredentials] = useState(initialCredentials)

  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/colors");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit = {login}>
                    <label>Username
                    <input
                    type = 'text'
                    name = 'username'
                    value = {credentials.username}
                    onChange = {handleChanges}
                    />
                    </label>
                    <label>Password
                    <input
                    type = 'password'
                    name = 'password'
                    value = {credentials.password}
                    onChange = {handleChanges}
                    />
                    </label>
                    <button>Log In</button>
                </form>
    </>
  );
};

export default Login;
