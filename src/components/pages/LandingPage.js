import React from "react";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";

import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import CartContext from "../../store/cart-context";

const LandingPage = () => {
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);

  const searchPostalCode = (event) => {
    setPostalCode(event.target.value);
  };

  console.log("postalCode", postalCode);
  console.log("type of postalCode", typeof postalCode);
  const onSubmitHandle = (event) => {
    event.preventDefault();
    cartCtx.addPostal(postalCode);
    navigate(`/available-stores/${postalCode}`);
  };

  return (
    <>
      <Container className="">
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
                    <Button className={classes["landing-btn"]} type="submit">
                      Search!
                    </Button>
                  </Form>
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

      {/* <Container className="fluid px-0">
        <Row className="align-items-center">
          <Col className="col-lg-6 order-2 order-md-1">
            <div
              id="headingGroup"
              class="text-white text-center d-none d-lg-block mt-5"
            >
              <h1>SOME INFO</h1>
              <h1>SOME INFO</h1>
              <h1>SOME INFO</h1>
              <h1>SOME INFO</h1>
            </div>
          </Col>
          <Col className="col-lg-6">
            <Image
              className=" d-none d-lg-inline"
              src= "../../assets/delivery2.png"
              alt=""
            />
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default LandingPage;
