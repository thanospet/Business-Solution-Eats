import React from "react";
import classes from "./ThankYouPage.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }} // to make sure container takes up full viewport height
    >
      <Row>
        {" "}
        <Col className="col-12 d-flex justify-content-center align-items-center">
          <div className={classes.rowText}>THANK YOU!</div>
          <BiCheck style={{ color: "green", fontSize: "10rem" }} />
        </Col>
        <Col className="col-12 d-flex justify-content-center align-items-center">
          <span className="py-2">
            Your order has been sent! Want to keep ordering? Follow the link to
            the Home page.
          </span>
        </Col>
        <Col className="col-12 d-flex justify-content-center align-items-center">
          <Button
            onClick={navigateHome}
            variant="success"
            className={classes.backBtn}
          >
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYouPage;
