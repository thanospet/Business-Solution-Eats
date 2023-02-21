import React from "react";
import classes from "./MainNavigation.module.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useContext } from "react";
import AuthComponent from "./AuthComponent/AuthComponent";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const handleAuthComponent = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShowLogin(true);
    setShow(false);
  };

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    authCtx.onLogout();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="medium">Login your account!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showLogin ? <AuthComponent /> : <AuthComponent onRegister />}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <span>
            {" "}
            <Button className="mx-2" variant="primary" onClick={handleClose}>
              Close
            </Button>
          </span>
          <span>
            <label>Not a member yet? </label>
            <span> </span>
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
          </span>
        </Modal.Footer>
      </Modal>
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
              {!authCtx.isLoggedIn ? (
                <span
                  onClick={handleAuthComponent}
                  className={`nav-link text-secondary ${classes.login}`}
                >
                  LOGIN
                </span>
              ) : (
                <DropdownButton
                  title={authCtx.name}
                  className={`text-secondary ${classes.dropdown}`}
                  variant="light"
                >
                  <Dropdown>
                    {" "}
                    <Dropdown.Item eventKey="settings">Settings</Dropdown.Item>
                    <Dropdown.Item
                      eventKey="logout"
                      onClick={() => {
                        handleLogout();
                        navigateHome();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown>
                </DropdownButton>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
