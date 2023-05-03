import React, { useEffect } from "react";
import classes from "./MainNavigation.module.css";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useContext } from "react";
import AuthComponent from "./AuthComponent/AuthComponent";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  // const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const handleClose = () => {
    authCtx.toggleShowModal();
    authCtx.resetShowSignIn();
  };

  const handleRegister = () => {
    authCtx.toggleSignIn();
  };

  const handleLogout = () => {
    authCtx.onLogout();
    navigateHome();
    window.location.reload();
  };

  // console.log("authCtx.isLoggedIn", authCtx.isLoggedIn);

  return (
    <>
      <Modal
        show={authCtx.modalState.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="medium">
            {authCtx.modalState.showSignIn ? (
              <span>Login to your account.</span>
            ) : (
              <span>Enter your credentials bellow.</span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthComponent
            onCloseModal={handleClose}
            onRegister={!authCtx.modalState.showSignIn}
          />
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <span>
            {" "}
            <Button className="mx-1" variant="light" onClick={handleClose}>
              Close
            </Button>
          </span>

          {authCtx.modalState.showSignIn ? (
            <span>
              <label>Not a member yet? </label>
              <span> </span>
              <Button variant="secondary" onClick={handleRegister}>
                Register
              </Button>
            </span>
          ) : (
            <Button variant="secondary" onClick={() => authCtx.toggleSignIn()}>
              Back
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <nav
        id="mainNavbar"
        className={`navbar navbar-dark navbar-expand-md py-0 fixed-top   ${classes.mainNav}`}
      >
        <Link to="/" className={`${classes.bsText}`}>
          BUSINESS SOLUTIONS EATS
        </Link>
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
              <a className="nav-link text-secondary">About</a>
            </li>
            <li className="nav-item">
              {!authCtx.isLoggedIn ? (
                <span
                  onClick={() => authCtx.toggleShowModal()}
                  className={`nav-link text-secondary ${classes.login}`}
                >
                  Sign In
                </span>
              ) : (
                <>
                  <DropdownButton
                    title={authCtx.firstName}
                    className={`text-secondary ${classes.dropdown}`}
                    variant="light"
                  >
                    <Dropdown>
                      {" "}
                      <Dropdown.Item eventKey="settings">
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="logout"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown>
                  </DropdownButton>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
