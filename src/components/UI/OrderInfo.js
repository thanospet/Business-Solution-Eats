import React from "react";
import { useContext, useState, useEffect } from "react";
import classes from "./OrderInfo.module.css";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
  Badge,
  InputGroup,
  Dropdown,
  DropdownButton,
  Toggle,
} from "react-bootstrap";

const OrderInfo = () => {
  const cartCtx = useContext(CartContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payment, setPayment] = useState("Payment Method");

  const link = "https://localhost:7160";

  useEffect(() => {
    axios
      .get(`${link}/api/Store/code-info/1`)
      .then(function (res) {
        const methodsArray = res.data.item.paymentMethods;
        setPaymentMethods(methodsArray);
        console.log("res.data.item", res.data.item.paymentMethods);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelect = (eventKey) => {
    setPayment(eventKey);
    console.log("event", eventKey);
  };

  const currentPostal = cartCtx.postalCode;

  console.log("currentPostal", cartCtx.postalCode);
  return (
    <Form>
      <Row className={`${classes.orderInfo}`}>
        <Col className="col-12 p-2">DELIVERY/TAKEAWAY</Col>
        <Col className="col-12 p-2">{currentPostal}</Col>
        <Col className="col-12 p-2">
          <Dropdown>
            <DropdownButton
              // variant="info"
              id="dropdown-basic-button"
              title={payment}
              onSelect={handleSelect}
            >
              {paymentMethods.map((method) => {
                return (
                  <>
                    <Dropdown.Item
                      key={method.id}
                      href="#/action"
                      eventKey={method.description}
                      onClick={() => handleSelect(method.description)}
                    >
                      {method.description}
                    </Dropdown.Item>
                  </>
                );
              })}
            </DropdownButton>
          </Dropdown>
        </Col>
        <Col className="col-12 p-2">
          <Form className={classes.text}>
            <FormControl type="text" placeholder="Floor" />
          </Form>
          <Form className={classes.text}>
            <FormControl type="text" placeholder="DoorBell" />
          </Form>
          <Form className={classes.text}>
            <FormControl type="text" placeholder="Phone Number" />
          </Form>
          <Form className={classes.textNotes}>
            <FormControl type="text" placeholder="Notes" />
          </Form>
          <Button className="my-3" variant="warning">
            Submit Order!
          </Button>{" "}
        </Col>
      </Row>
    </Form>
  );
};

export default OrderInfo;
