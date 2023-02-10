import React from "react";
import MainNavigation from "../MainNavigation";
import classes from "./Error.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <>
      {/* <MainNavigation /> */}
      <Container
        className={`vh-100 d-flex align-items-center justify-content-center`}
      >
        <Row className={`${classes.row}`}>
          <Col
            className={`col-12 d-flex justify-content-center ${classes.col}`}
          >
            <div>Couldn't find the page!</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorPage;
