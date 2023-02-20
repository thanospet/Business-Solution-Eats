import React from "react";
import classes from "./MainNavigation.module.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
  LabelForm,
} from "react-bootstrap";
import { useState } from "react";
import AuthComponent from "./AuthComponent/AuthComponent";

const MainNavigation = () => {
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
    setShow(false);
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
          <Modal.Title>Login your account!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthComponent />
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
            <Button variant="primary" onClick={handleClose}>
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
              <span
                onClick={handleAuthComponent}
                className={`nav-link text-secondary ${classes.login}`}
              >
                LOGIN
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
