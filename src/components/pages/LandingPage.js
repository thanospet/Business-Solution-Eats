import React from "react";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
    <>
      <Container className="fluid px-0">
        <Row className="align-items-center">
          <Col className="col-lg-6">
            <div
              id="headingGroup"
              class="text-white text-center d-none d-lg-block mt-5"
            >
              <h1>
                <div className={classes["landing-page-h1"]}></div>
                <div className={classes["landing-page-form"]}>
                  <h1>Hello !</h1>
                  <Form  onSubmit={onSubmitHandle}>
                    <input
                      value={postalCode}
                      onChange={searchPostalCode}
                      className={classes.input}
                      type="text"
                      id="location"
                      placeholder="Enter your address"
                    ></input>
                    <Button  className={classes["landing-btn"]} type="submit">Order!</Button>
                  </Form >
                </div>
              </h1>
            </div>
          </Col>
          <Col className="col-lg-6">
            <Image
              className={classes["main-image"]}
              src="../../assets/meals.jpg"
              alt=""
            />
          </Col>
        </Row>
      </Container>

      <Container className="fluid px-0">
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
      </Container>

    </>
  );
};

export default LandingPage;

// <div className={classes.container}>
//   <main className={classes["main-image"]}>
//     <div className={classes["landing-page-h1"]}></div>
//     <div className={classes["landing-page-form"]}>
//       <h1>Hello !</h1>
//       <form onSubmit={onSubmitHandle}>
//         <input
//           value={postalCode}
//           onChange={searchPostalCode}
//           className={classes.input}
//           type="text"
//           id="location"
//           placeholder="Enter your address"
//         ></input>
//         <button className={classes["landing-btn"]}>Order!</button>
//       </form>
//     </div>
//   </main>
// </div>
