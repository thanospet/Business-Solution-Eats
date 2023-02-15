import React from "react";
import classes from "./Spinners.module.css";

const LoaderSpinner = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoaderSpinner;
