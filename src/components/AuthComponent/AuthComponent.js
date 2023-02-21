import React from "react";
import classes from "./AuthComponent.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import StrengthMeter from "../StrengthMeter/StrengthMeter";
import AuthContext from "../../store/auth-context";

const AuthComponent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const authCtx = useContext(AuthContext);

  const addEmail = (eventEmail) => {
    setEmail(eventEmail);
  };

  const addPassword = (eventPassword) => {
    setPassword(eventPassword);
  };

  const addFirstName = (eventName) => {
    setFirstName(eventName);
  };

  const addLastName = (eventName) => {
    setLastName(eventName);
  };

  const Login = (event) => {
    event.preventDefault();

    authCtx.checkAuthentication(email, password);
  };

  const Register = (event) => {
    event.preventDefault();

    authCtx.registerUser(email, password, firstName, lastName);
  };

  return (
    <>
      <div className={classes.login}>
        <form>
          <div className={`${classes.control}`}>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => addEmail(event.target.value)}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => addPassword(event.target.value)}
              // onBlur={authCtx.validatePassword}
            />
          </div>

          {props.onRegister && (
            <>
              <div className={`${classes.control}`}>
                <label htmlFor="firstname">First Name </label>
                <input
                  type="text"
                  id="name"
                  value={firstName}
                  onChange={(event) => addFirstName(event.target.value)}
                  // onBlur={authCtx.validatePassword}
                />
              </div>
              <div className={`${classes.control}`}>
                <label htmlFor="lastname">Last Name </label>
                <input
                  type="text"
                  id="name"
                  value={lastName}
                  onChange={(event) => addLastName(event.target.value)}
                  // onBlur={authCtx.validatePassword}
                />
              </div>
            </>
          )}

          {!props.onRegister ? (
            <div className={classes.actions}>
              <Button
                type="submit"
                className={`${classes.btn}`}
                onClick={Login}
                // disabled={!authCtx.formIsValid}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className={classes.actions}>
              <Button
                type="submit"
                className={`${classes.btn}`}
                onClick={Register}
                // disabled={!authCtx.formIsValid}
              >
                Register
              </Button>
            </div>
          )}
        </form>

        <div className="mt-4">
          {props.onRegister && <StrengthMeter passwordState={password} />}
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
