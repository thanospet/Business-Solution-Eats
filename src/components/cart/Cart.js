import React from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

import { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import "bootstrap/dist/css/bootstrap.css";
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
import CartOrderBadge from "./CartOrderBadge";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const allItems = cartCtx.items;

  console.log("allItems", allItems);

  return (
    <Container className={classes.cart}>
      <Row className="d-flex justify-content-center">My Cart</Row>
      <Row className="">
        {allItems.map((item) => {
          return (
            <Row key={item.id} className="py-3 d-flex justify-content-between">
              <Col className="col-2 ">
                <Badge bg="secondary">{item.amount}</Badge>
              </Col>
              <Col className="col-8 ">{item.title}</Col>
              <Col className="col-2 ">$ {item.price}</Col>
            </Row>
          );
        })}
      </Row>
      <Row className="d-flex justify-content-start">
        <CartOrderBadge />
      </Row>
      <Row className="d-flex justify-content-start">actions</Row>
    </Container>
  );
};

export default Cart;
