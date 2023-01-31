import React from "react";
import { useContext, useState } from "react";
import classes from "./CheckOutPage.module.css";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import Cart from "../cart/Cart";
import OrderInfo from "../UI/OrderInfo";
import TotalPriceBudge from "../cart/TotalPriceBudge";

const CheckOutPage = () => {
  const cartCtx = useContext(CartContext);

  return (
    <Container className="py-5">
      <Row className=" my-5">
        <Col className="col-6 p-3">
          <OrderInfo />
        </Col>
        <Col className={` col-6 d-flex justify-content-center ${classes.cart}`}>
          <Cart forCheckOut />
          <TotalPriceBudge />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutPage;
