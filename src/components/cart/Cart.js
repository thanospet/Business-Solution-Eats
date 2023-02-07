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
  const [badgeIsShown, setBadgeIsShown] = useState(false);

  const allItems = cartCtx.items;

  useEffect(() => {
    console.log("EDW SPAEI ??? 1");
    if (allItems.length > 0) {
      setContainerIsShown(false);
      console.log("EDW SPAEI ??? 2");
      setBadgeIsShown(true);
    } else {
      console.log("EDW SPAEI ??? 3");
      return;
    }
  }, [allItems]);

  console.log("allItems", allItems);
  console.log("EDW SPAEI ??? 4");

  return (
    <>
      <Container className={`${classes.cart}`}>
        {containerIsShown && <EmptyCart />}
        {!containerIsShown && <h3>Your Order</h3>}
        <Row className="d-flex my-3">
          {allItems.map((item) => {
            return (
              <Row key={item.id}>
                <Row
                  key={item.id}
                  className={`py-3 my-3 d-flex justify-content-between${classes.rows}`}
                >
                  <Col className="col-2 ">
                    <Badge bg="secondary">{item.amount}</Badge>
                  </Col>
                  <Col
                    onClick={() => props.onShowModal(item)}
                    className="col-4 "
                  >
                    {item.title}
                  </Col>

                  <Col
                    onClick={() => props.onShowModal(item)}
                    className="col-2 "
                  >
                    $ {item.price}
                  </Col>
                  {!props.forCheckOut && (
                    <Col className="col-4 ">
                      <Form>
                        <Button
                          variant="success"
                          className={` px-2 ${classes.cartBtn}`}
                          size="sm"
                          onClick={() => {
                            props.onMinusAmount();
                            props.onRemoveFromCart(item);
                          }}
                        >
                          -
                        </Button>

                        <Button
                          variant="success"
                          className={` px-2 ${classes.cartBtn}`}
                          size="sm"
                          onClick={() => {
                            props.onAddAmount();
                            props.onAddToCartHandler(item);
                          }}
                        >
                          +
                        </Button>
                      </Form>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col className={`col-10 ${classes.itemNotes}`}>
                    {item.notes.length > 0 && "Notes: " + item.notes}
                  </Col>
                </Row>
              </Row>
            );
          })}
        </Row>

        <hr></hr>
        {badgeIsShown && (
          <Row className="d-flex justify-content-start py-4 ">
            {!props.forCheckOut &&
              cartCtx.items.length > 0 && <CartOrderBadge /> && (
                <Button
                  onClick={() => cartCtx.clearCart()}
                  variant="success"
                  size="sm"
                >
                  Clear all
                </Button>
              )}
          </Row>
        )}

        <Row className="d-flex justify-content-start"></Row>
      </Container>
    </>
  );
};

export default Cart;
