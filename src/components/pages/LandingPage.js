import React from "react";
import classes from "./LandingPage.module.css";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

const LandingPage = () => {
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  const searchPostalCode = (event) => {
    
      setPostalCode(event.target.value);
  };

  console.log("postalCode", postalCode);

  const onSubmitHandle = (event) => {
    event.preventDefault();

      navigate(`/available-stores/${postalCode}`);
  };

  return (
    <div className={classes.container}>
      <main className={classes["main-image"]}>
        <div className={classes["landing-page-h1"]}></div>
        <div className={classes["landing-page-form"]}>
          <h1>Hello !</h1>
          <form onSubmit={onSubmitHandle}>
            <input
              value={postalCode}
              onChange={searchPostalCode}
              className={classes.input}
              type="text"
              id="location"
              placeholder="Enter your address"
            ></input>
            <button className={classes["landing-btn"]}>Order!</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
