import React from "react";
import classes from "./MainNavigation.module.css";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <nav
      id="mainNavbar"
      className={`navbar navbar-dark navbar-expand-md py-0 fixed-top   ${classes.mainNav}`}
    >
      <a href="/" className={`${classes.bsText}`}>
        BUSINESS SOLUTION EATS
      </a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navLinks"
        aria-label="Toggle navigation"
        onClick={navigateHome}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navLinks">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="" className="nav-link text-secondary">
              ABOUT
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link text-secondary">
              LOGIN
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
