import React from "react";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import CartOrderBadge from "./CartOrderBadge";
import EmptyCart from "../UI/EmptyCart";
import { useEffect } from "react";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [containerIsShown, setContainerIsShown] = useState(true);
  const [badgeIsShown, setBadgeIsShown] = useState(false);
  const [amount, setAmount] = useState(1);

  const allItems = cartCtx.items;

  useEffect(() => {
    if (allItems.length > 0) {
      setContainerIsShown(false);
      setBadgeIsShown(true);
    } else {
      setContainerIsShown(true);
    }
  }, [allItems]);

  const addAmount = () => {
    if (amount >= 0) {
      setAmount(amount + 1);
    }
  };
  const minusAmount = () => {
    if (amount === 1) {
      return;
    } else {
      setAmount(amount - 1);
    }
  };

  const addToCartHandler = (item) => {
    console.log("itemAAAA", item);
    cartCtx.addItem({
      id: item.id,
      title: item.title,
      amount: 1,
      notes: item.notes,
      price: item.price,
      options: item.options,
    });
    console.log("amount", amount);
  };
  const removeFromCartHandler = (item) => {
    setContainerIsShown(false);
    cartCtx.removeItem(item);
  };

  console.log("allItems", allItems);

  return (
    <>
      <Container className={` ${classes.cart}`}>
        {containerIsShown ? <EmptyCart /> : <h3>Your Order</h3>}

        <Row className="d-flex my-3">
          {allItems.map((item) => {
            return (
              <Row key={item.id}>
                <Row
                  key={item.id}
                  className={`py-3 my-3 d-flex justify-content-between align-items-center${classes.rows}`}
                >
                  <Col className="col-2 ">
                    <Badge bg="secondary">{item.amount}</Badge>
                  </Col>
                  <Col className="col-4 ">{item.title}</Col>
                  <Col className="col-2 ">$ {item.price.toFixed(2)}</Col>
                  {!props.forCheckOut && (
                    <Col className="col-4 ">
                      <Form>
                        <Button
                          variant="success"
                          className={` px-2 ${classes.cartBtn}`}
                          size="sm"
                          onClick={() => {
                            removeFromCartHandler(item);
                          }}
                        >
                          -
                        </Button>

                        <Button
                          variant="success"
                          className={` px-2 ${classes.cartBtn}`}
                          size="sm"
                          onClick={() => {
                            addToCartHandler(item);
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
                    {item.notes.length > 0 && "Notes: " + item.notes}{" "}
                  </Col>
                  <Col> {item.options && "+Options"}</Col>
                  <hr></hr>
                </Row>
              </Row>
            );
          })}
        </Row>

        {badgeIsShown && (
          <Row className="d-flex justify-content-start py-4 ">
            {!props.forCheckOut && cartCtx.items.length > 0 && (
              <Row className="d-flex align-items-center justify-content-center">
                <Col className="d-flex align-items-center justify-content-center col-12">
                  <Row>
                    <Col className="col-12 d-flex align-items-center justify-content-center">
                      <Button
                        className={classes.clearBtn}
                        onClick={() => cartCtx.clearCart()}
                      >
                        Clear all
                      </Button>
                    </Col>
                    <Col
                      className={`col-12 d-flex align-items-center justify-content-center fixed-bottom ${classes.cartOrderBadge}`}
                    >
                      <CartOrderBadge className={``} />
                    </Col>
                  </Row>
                  <Row></Row>
                </Col>
              </Row>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Cart;
