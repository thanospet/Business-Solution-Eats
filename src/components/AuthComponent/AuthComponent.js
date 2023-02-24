import React from "react";
import classes from "./AuthComponent.module.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
  Checkbox,
} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import StrengthMeter from "../StrengthMeter/StrengthMeter";
import AuthContext from "../../store/auth-context";

const AuthComponent = (props) => {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  function handleCheckboxChange(event) {
    setRememberMe(event.target.checked);
  }

  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe);
  }, [rememberMe]);

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
    console.log("rememberMe", rememberMe);
    authCtx.checkAuthentication(email, password, rememberMe);
    props.onCloseModal();
  };

  const Register = (event) => {
    event.preventDefault();
    authCtx.registerUser(email, password, firstName, lastName);
    props.onCloseModal();
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
            <>
              <div className={classes.actions}>
                <Button
                  type="submit"
                  className={` ${classes.btn}`}
                  onClick={Login}
                  // disabled={!authCtx.formIsValid}
                >
                  Login
                </Button>
              </div>
              <label className="form-check-label" for="flexCheckDefault">
                <div className={` pt-3 ${classes.checkboxWrapper}`}>
                  <div className={` ${classes.text}`}>Remember me</div>
                  <div className={` mx-2 ${classes.check}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={rememberMe}
                      id="flexCheckDefault"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </label>
            </>
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
