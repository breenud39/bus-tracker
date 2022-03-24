import React from "react";
import { Routes,Route,Link,Outlet } from "react-router-dom";
import { Hero } from "Hero";
import { Login } from "Login";

const Login = () => {
  return (
    //   add mekonens code here
    <div>
      <h1>Login</h1>
      <form>
        <label>
          <input type="text"></input>
        </label>
        <label>
          <input type="email"></input>
        </label>

        <label>
          <input type="password"></input>
        </label>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Login;
