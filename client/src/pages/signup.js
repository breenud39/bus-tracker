import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { Hero } from "Hero";
import { Login } from "Login";

const Signup = () => {
  return (
    //   add mekonens code here
    <div>
      <h1>Signup</h1>
      <form>
        <label>
          <input type="text"></input>
        </label>
        <label>
          <input type="text"></input>
        </label>

        <label>
          <input type="text"></input>
        </label>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Login;
