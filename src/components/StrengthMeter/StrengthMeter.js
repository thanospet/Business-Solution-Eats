import React, { Fragment, useState } from "react";
import classes from "./StrengthMeter.module.css";
import "bootstrap/dist/css/bootstrap.css";

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

  return (
    <Fragment>
      <div className="text-muted small"> Password Strength :</div>
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
