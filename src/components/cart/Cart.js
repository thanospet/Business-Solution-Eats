import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const Cart = () => {
  return (
    <Container className={classes.cart}>
      <Row className="d-flex justify-content-center">My Cart</Row>
      <Row className="d-flex justify-content-start">
        <Col className="col-12"> Cart Items</Col>
      </Row>
      <Row className="d-flex justify-content-start">price</Row>
      <Row className="d-flex justify-content-start">actions</Row>
    </Container>
  );
};

export default Cart;
