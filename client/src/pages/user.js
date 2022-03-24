import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

import { Login } from "./login";
import { Signup } from "./signup";

const User = () => {
  return (
    <div>
      <Routes path="/">
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>

        <Outlet></Outlet>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        
      </Routes>
    </div>
  );
};

export default User;
