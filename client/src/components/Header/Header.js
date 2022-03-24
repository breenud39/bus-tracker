import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import { Hero } from "../Hero/Hero";
import { Routes, Route, Link, Outlet } from "react-router";

const Header = () => {
  const { pages = [Home, About], setCurrentPage, currentPage } = props;

  return (
    // Nav routes
    <div>
      <header>
        <Link className="text-light" to="/">
          <h1 className="m-0">Bus Tracker</h1>
        </Link>
        <nav>
          <Routes path="/">
            <Route index element={<Home />}></Route>
            {/* <Route path="trip-planner" element={<TripPlanner />}></Route>
            <Route path="routes-and-schedules" element={<RoutesAndSchedules />}></Route>
            <Route path="fares-and-passes" element={<FaresAndPasses />}></Route>
            <Route path="service-advisories" element={<serviceAdvisories />}></Route> */}
            <Route path="contact" element={<Contact />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route exact path="/profile/:username?" component={Profile} />
          </Routes>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/trip-planner">Trip Planner</Link>
            </li>
            <li>
              <Link to="/routes-and-schedules">Routes And Schedules</Link>
            </li>
            <li>
              <Link to="/fares-and-passes">Fares And Passes</Link>
            </li>
            <li>
              <Link to="/service-advisories">Service And Advisories</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/profile/:username?">{/* Icon */}</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet></Outlet>
    </div>
  );
};

export default Header;
