import React, { Fragment, useState, useEffect } from "react";
import classes from "./StrengthMeter.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Image, Modal } from "react-bootstrap";

const StrengthMeter = (props) => {
  const [showMeter, setShowMeter] = useState(true);

  const password = props.passwordState;

  const atLeastOneUppercase = /[A-Z]/g;
  const atLeastOneLowercase = /[a-z]/g;
  const atLeastOneNumeric = /[0-9]/g;
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
  const eightCharsOrMore = /.{8,}/g;

  const checkPwd = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(checkPwd).filter(
    (value) => value
  ).length;

  console.log("passwordStrength", passwordStrength);

  // let green =
  //   "linear-gradient(90deg, rgba(26,48,14,1) 0%, rgba(65,170,46,1) 50%, rgba(0,251,155,1) 100%)";

  return (
    <Fragment>
      <div className="text-muted small"> Password Strength</div>
      <div
        className={classes[("password-strength-meter", "input")]}
        style={{
          backgroundColor: `${
            ["red", "orange", "#03a2cc", "#03a21c", "green"][
              passwordStrength - 1
            ] || ""
          }`,
          height: "100%",
          width: `${(passwordStrength / 5) * 100}%`,
          display: "block",
          borderRadius: "3px",
          transition: "width 0.2s",
        }}
      ></div>
    </Fragment>
  );
};

export default StrengthMeter;
