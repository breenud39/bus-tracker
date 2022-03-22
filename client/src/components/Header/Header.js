import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import {Hero} from "../Hero/Hero";



const Header = () => {
  return (
    <header className="">
      <div className="">
        <Link className="text-light" to="/">
          <h1 className="m-0">Bus Tracker</h1>
        </Link>
        <Nav></Nav>

        <p className="m-0"></p>
      </div>
    </header>
  );
};

export default Header;
