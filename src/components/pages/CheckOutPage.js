import React from "react";
import { useContext, useState } from "react";
import classes from "./CheckOutPage.module.css";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import { Container, Row, Col } from "react-bootstrap";
import Cart from "../cart/Cart";
import OrderInfo from "../UI/OrderInfo";

const CheckOutPage = () => {
  window.scrollTo(0, 0);
  const cartCtx = useContext(CartContext);

  return (
    <Container className="py-5">
      <Row className="my-5">
        <Col className="col-6">
          <OrderInfo />
        </Col>
        <Col
          className={`col-6 d-flex flex-column justify-content-between ${classes.cart}`}
        >
          <Cart forCheckOut />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckOutPage;
