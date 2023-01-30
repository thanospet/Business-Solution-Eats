import React from "react";
import { useContext, useState } from "react";
import classes from "./CartOrderBadge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Badge } from "react-bootstrap";

import CartContext from "../../store/cart-context";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const CheckOutPage = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col className="col-6 d-flex justify-content-center">
          {" "}
          Order/ postal/Payment method/tip?/ text sxolia
        </Col>
        <Col className="col-6 d-flex justify-content-center">
          {" "}
          cart with price kai apo katw total price
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutPage;
