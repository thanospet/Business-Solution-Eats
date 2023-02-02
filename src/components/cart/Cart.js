import React from "react";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
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
import EmptyCart from "../UI/EmptyCart";
import { useEffect } from "react";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [containerIsShown, setContainerIsShown] = useState(true);
  const allItems = cartCtx.items;

  useEffect(() => {
    if (allItems.length > 0) {
      setContainerIsShown(false);
    } else {
      return;
    }
  }, [allItems]);

  console.log("allItems", allItems);

  return (
    <>
      <Container className={` ${classes.cart}`}>
        {containerIsShown && <EmptyCart />}
        <Row className="d-flex sticky-top">
          {allItems.map((item) => {
            return (
              <Row
                key={item.id}
                className="py-3 my-3 d-flex justify-content-between"
              >
                <Col className="col-2 ">
                  <Badge bg="secondary">{item.amount}</Badge>
                </Col>
                <Col className="col-4 ">{item.title}</Col>

                <Col className={`col-4 ${classes.itemNotes}`}>
                  {item.notes.length > 0 && "Notes: " + item.notes}
                </Col>

                <Col className="col-2 ">$ {item.price}</Col>
              </Row>
            );
          })}
        </Row>
        <Row className="d-flex justify-content-start">
          {!props.forCheckOut && <CartOrderBadge />}
        </Row>
        <Row className="d-flex justify-content-start"></Row>
      </Container>
    </>
  );
};

export default Cart;
