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
  Modal,
} from "react-bootstrap";

const OrderInfo = () => {
  const cartCtx = useContext(CartContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payment, setPayment] = useState();
  const [paymentTitle, setPaymentTitle] = useState("Payment Method");
  const [floor, setFloor] = useState("");
  const [doorbell, setDoorbell] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("No Notes");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  const link = "https://localhost:7160";

  const currentPostal = cartCtx.postalCode;
  const allitems = cartCtx.items;
  console.log("allitems", allitems);

  const totalPrice = cartCtx.items.reduce((curPrice, item) => {
    return curPrice + item.price * item.amount;
  }, 0);

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

  const handleSelect = (method) => {
    console.log("method", method);
    console.log("method.id", method.id);
    console.log("method.description", method.description);
    setPayment(method.id);
    setPaymentTitle(method.description);
  };

  const handleChangeFloor = (event) => {
    setFloor(event.target.value);
  };
  const handleChangeDoorbell = (event) => {
    setDoorbell(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };

  // "https://localhost:7160/api/Order/order"
  // "http://192.168.84.174:5237/api/Order/order"

  const submitHandler = (event) => {
    event.preventDefault();
    setShow(true);
    setIsSubmitting(true);
    axios

      .post("https://localhost:7160/api/Order/order", {
        storeId: 1,
        paymentCodeId: payment,
        totalCost: totalPrice.toFixed(2),
        floor: floor,
        contactPhoneNum: phoneNumber,
        doorBellName: doorbell,
        notes: notes,
        estimatedDeliveryTime: 40,
        products: allitems.map((product) => {
          return {
            productId: product.id,
            productNotes: "",
            productCount: product.amount,
          };
        }),
      })
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
      });

    console.log("data", payment);
    console.log("totalPrice", totalPrice);
  };

  return (
    <>
      <Modal
        closeButton
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {isSubmitting ? <p>Sending Order...</p> : <p>Order Send !</p>}
        </Modal.Body>
        <Modal.Footer>
          {!isSubmitting && (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Form onSubmit={submitHandler}>
        <Row className={`${classes.orderInfo}`}>
          <Col className="col-12 p-2">DELIVERY/TAKEAWAY</Col>
          <Col className="col-12 p-2">{currentPostal}</Col>
          <Col className="col-12 p-2">
            <Dropdown>
              <DropdownButton
                // variant="info"
                id="dropdown-basic-button"
                title={paymentTitle}
              >
                {paymentMethods.map((method) => {
                  return (
                    <>
                      <Dropdown.Item
                        key={method.id}
                        eventKey={method.id}
                        onClick={() => handleSelect(method)}
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
              <FormControl
                onChange={handleChangeFloor}
                value={floor}
                type="text"
                placeholder="Floor"
              />
            </Form>
            <Form className={classes.text}>
              <FormControl
                onChange={handleChangeDoorbell}
                value={doorbell}
                type="text"
                placeholder="DoorBell"
              />
            </Form>
            <Form className={classes.text}>
              <FormControl
                onChange={handleChangePhoneNumber}
                value={phoneNumber}
                type="text"
                placeholder="Phone Number"
              />
            </Form>
            <Form className={classes.textNotes}>
              <FormControl
                onChange={handleChangeNotes}
                value={notes}
                type="text"
                placeholder="Notes"
              />
            </Form>
            <Button type="submit" className="my-3" variant="warning">
              Submit Order!
            </Button>{" "}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default OrderInfo;
