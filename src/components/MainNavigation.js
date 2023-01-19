import React from "react";

const MainNavigation = () => {
  return (
    
    <nav
    
    id="mainNavbar"
    className="navbar navbar-dark navbar-expand-md py-0 fixed-top ba"
  >
    <a href="#" className="navbar-brand">
     BUSINESS SOLUTION EATS
    </a>
    <button
      className="navbar-toggler"
      data-toggle="collapse"
      data-target="#navLinks"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navLinks">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="" className="nav-link">
            ABOUT
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            LOGIN
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            MY CART
          </a>
        </li>
      </ul>
    </div>
  </nav>

  );
};

export default MainNavigation;
