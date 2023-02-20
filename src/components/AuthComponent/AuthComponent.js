import React from "react";
import classes from "./AuthComponent.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Image, Modal } from "react-bootstrap";
import { useState, useEffect, useReducer, Fragment } from "react";
import StrengthMeter from "../StrengthMeter/StrengthMeter";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const AuthComponent = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  //UseEffect here has a timer, every half a second, so it doesnt execute with every key stroke!
  //Because that would cause a lot of traffic if it needs to sent an http request.
  //BUT the timer needs to ""reset". Because if we just put a timeout, useEffect will just
  //execute normaly, and just after half a second, the results would be visible.
  //Also the timer only activates once. So every keystroke after 500 milisecs, will still cause
  //the state to re-render. So we need to to add return () => {}; to clean it (cleanup function).

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  //----------------------------------------------------------
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check form validity!");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);
  //----------------------------------------------------------

  //Edw to dispatchEmail pernei ena action! Edw einai object me type kai  value(val to onomasa)
  //giati thelw na apothikeuete kiolas h timh toy target value (oti grafw diladi)
  //Ayto to action pernaei sto const emailReducer = (state, action). Ekei exw to logic.
  //to eimailReducer pernei to action tou dispatch.
  //To state nomizw afora to emailState...giauto panw exoume state.value kai oxi val san to action.val.
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    //   );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <>
      <div className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailState.isValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              passwordState.isValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>

          <div className={classes.actions}>
            <button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <StrengthMeter passwordState={passwordState} />
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
