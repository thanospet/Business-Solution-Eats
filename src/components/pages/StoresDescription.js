import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./StoresDescription.module.css";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
const StoresDescription = () => {
  return (
    <Container className="fluid px-0 my-5">
      <Row className="align-items-center d-flex flex-direction-column ">
        <Col className="col-2 d-flex justify-content-center ">col 3</Col>
        <Col className="col-8 items-align-center">
          <Image
            className={`d-block m-auto ${classes.logoIcon}`}
            src="https://www.coffeeisland.gr/assets/img/social/home.jpg"
          ></Image>
        </Col>
        <Col className="col-2 d-flex justify-content-center">Cart</Col>
      </Row>

      {/* ----------------------------------------------- */}

      <Container className="fluid px-0 py-5 ">
        <Row className="align-items-center ">
          <Col className="col-2 d-flex justify-content-center">---</Col>
          <Col className="col-8 d-flex justify-content-center ">
            SOME STORE INFO
          </Col>
          <Col className="col-2 d-flex justify-content-center">---</Col>
        </Row>
      </Container>

      {/* ----------------------------------------------- */}

      <Container className="fluid px-0 py-5 my-5">
        <Row className="align-items-center ">
          <Col className="col-2 d-flex justify-content-center">---</Col>
          <Col className="col-8 d-flex justify-content-center ">
            MAPPED PRODUCT CATEGORY #1
          </Col>
          <Col className="col-2 d-flex justify-content-center">---</Col>
        </Row>
      </Container>

      {/* ----------------------------------------------- */}
    </Container>
  );
};

export default StoresDescription;
