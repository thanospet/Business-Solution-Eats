import React from "react";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AuthContext from "../../store/auth-context";
// import GoogleMapComponent from "../GoogleMap/GoogleMapComponent";

import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import CartContext from "../../store/cart-context";

const LandingPage = (props) => {
  const authCtx = useContext(AuthContext);
  const [postalCode, setPostalCode] = useState("");
  const [isPostalValid, setIsPostalValid] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const pattern = /^[0-9a-zA-Z]+$/;
  const [show, setShow] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowAddressModal(false);
  };

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

  const onOpenModal = () => {
    authCtx.handleModalState(true);
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  console.log("authCtx", authCtx);

  return (
    <>
      <Container className="">
        <Modal
          //add address modal
          show={showAddressModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            AAAAAAAAAAAAAAAA{/* <GoogleMapComponent /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              AAAAAAA
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          //error with postal modal
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
              class="text-white text-center d-none d-lg-block mt-2"
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
                      {/* <h4>Enter a postal code.</h4>
                      <input
                        value={postalCode}
                        onChange={searchPostalCode}
                        className={classes.input}
                        type="text"
                        id="location"
                        placeholder="e.g : 50100"
                      ></input> */}

                      <h4 className="pb-2">Welcome back {authCtx.firstName}</h4>
                      <select
                        value={postalCode}
                        onChange={searchPostalCode}
                        className={classes.input}
                        id="location"
                      >
                        <option value="">Select a postal code</option>
                        <option value="50100">50100</option>
                        <option value="65302">65302</option>
                      </select>
                      <span className={`${classes.spanButtons}`}>
                        <Button
                          onClick={handleAddAddress}
                          className={classes["landing-btn"]}
                          type="button"
                        >
                          <span
                            style={{
                              paddingBottom: "2px",
                              paddingLeft: "1px",
                              marginTop: "4px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              textAlign: "center",
                              marginRight: "10px",
                            }}
                          >
                            +
                          </span>
                          Add address
                        </Button>
                        <Button
                          onClick={handlePostalValidation}
                          className={classes["landing-btn"]}
                          type="submit"
                        >
                          Search!
                        </Button>
                      </span>
                    </Form>
                  ) : (
                    <Form className={classes["landing-page-form"]}>
                      <h2>
                        Welcome to Business Solutions Eats! Please login or
                        register to continue...
                      </h2>
                      <Button variant="success" onClick={onOpenModal}>
                        Add account
                      </Button>
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
