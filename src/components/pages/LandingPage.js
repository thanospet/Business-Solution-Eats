import React from "react";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AuthContext from "../../store/auth-context";

import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import CartContext from "../../store/cart-context";

const LandingPage = () => {
  const authCtx = useContext(AuthContext);
  const [postalCode, setPostalCode] = useState("");
  const [isPostalValid, setIsPostalValid] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const pattern = /^[0-9a-zA-Z]+$/;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const searchPostalCode = (event) => {
    setPostalCode(event.target.value);
  };

  const handlePostalValidation = () => {
    if (postalCode.length === 5 && pattern.test(postalCode)) {
      setIsPostalValid(true);
      setError("");
    } else {
      setError(
        "Postal code must be 5 characters long and can only contain letters and numbers."
      );
    }
  };

  console.log("postalCode", postalCode);
  console.log("type of postalCode", typeof postalCode);
  const onSubmitHandle = (event) => {
    event.preventDefault();
    if (isPostalValid) {
      cartCtx.addPostal(postalCode);
      navigate(`/available-stores/${postalCode}`);
    } else {
      setShow(true);
    }
  };

  console.log("authCtx", authCtx);

  return (
    <>
      <Container className="">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Oops...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Postal code must be 5 characters long and can only contain letters
            and numbers.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="mx-0">
          <Col className="col-lg-6">
            <div
              id="headingGroup"
              class="text-white text-center d-none d-lg-block mt-5"
            >
              <h1>
                <div className={classes["landing-page-h1"]}></div>
                <div className={classes["landing-page-form"]}>
                  <h1>Food, takeaway and groceries. Delivered.</h1>

                  {authCtx.isLoggedIn ? (
                    <Form
                      className={classes["landing-page-form"]}
                      onSubmit={onSubmitHandle}
                    >
                      <h4>Enter a postal code.</h4>
                      <input
                        value={postalCode}
                        onChange={searchPostalCode}
                        className={classes.input}
                        type="text"
                        id="location"
                        placeholder="e.g : 50100"
                      ></input>
                      <Button
                        onClick={handlePostalValidation}
                        className={classes["landing-btn"]}
                        type="submit"
                      >
                        Search!
                      </Button>
                    </Form>
                  ) : (
                    <Form className={classes["landing-page-form"]}>
                      <h2>
                        Welcome to Business Solutions Eats! Please login or
                        register to continue...
                      </h2>
                    </Form>
                  )}
                </div>
              </h1>
            </div>
          </Col>
          <Col className="col-lg-6">
            <Image
              className={`d-flex align-items-end ${classes["main-image"]}`}
              src=""
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;
