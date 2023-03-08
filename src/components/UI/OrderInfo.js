import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./OrderInfo.module.css";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import OrderContext from "../../store/order-context";
import AuthContext from "../../store/auth-context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
  Modal,
  FormLabel,
} from "react-bootstrap";
import LoaderSpinner from "../spinners/Spinner";

const OrderInfo = () => {
  const cartCtx = useContext(CartContext);
  const orderCtx = useContext(OrderContext);
  const authCtx = useContext(AuthContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payment, setPayment] = useState();
  const [paymentTitle, setPaymentTitle] = useState("Payment Method");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPaymentMethodValid, setIsPaymentMethodValid] = useState(false);
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };
  const navigateThankYouPage = () => {
    navigate("/thank-you-page");
  };

  const pattern = /^[0-9a-zA-Z]*$/;

  const link = "http://localhost:7160";

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
    setIsPaymentMethodValid(true);
  };

  const handleChangeNotes = (event) => {
    if (event.target.value.length < 100) setNotes(event.target.value);
  };

  useEffect(() => {
    if (isPaymentMethodValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isPaymentMethodValid]);

  const formatProductOptions = (productOptions) => {
    const result = Object.keys(productOptions).reduce((array, key) => {
      return [
        ...array,
        {
          productCategoryId: Number(key),
          ingredientIds: productOptions[key]?.map((i) => i.ingId),
        },
      ];
    }, []);

    return result;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const configToken = {
      headers: {
        Authorization: `Bearer ${authCtx.authToken}`,
      },
    };

    console.log("orderCtx.selectedAddress.id", orderCtx.selectedAddress.id);
    console.log("authToken", authCtx.authToken);

    const payload = {
      storeId: 1,
      paymentCodeId: payment,
      totalCost: totalPrice.toFixed(2),
      addressId: 12,
      contactPhoneNum: authCtx.phone,
      notes: notes,
      estimatedDeliveryTime: 40,
      products: allitems.map((product) => {
        return {
          productId: product.id,
          productCategoryAndIngredients: formatProductOptions(product.options),
          productNotes: "",
          productCount: product.amount,
        };
      }),
    };

    setIsSubmitting(true);

    axios
      .post("http://localhost:7160/api/Order/order", payload, configToken)
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitting(false);
        toast("Order Failed", {
          type: "danger",
        });
      });
    navigateThankYouPage();
    console.log("data", payment);
    console.log("totalPrice", totalPrice);
  };

  return (
    <>
      <Toaster />
      <Form onSubmit={submitHandler}>
        <Row className={`${classes.orderInfo}`}>
          <Col className="col-12 p-2">
            <Dropdown className={classes.dropdown}>
              <FormLabel className="fw-bold">Payment</FormLabel>
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
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
              <FormLabel className=" px-1 fw-bold">Floor</FormLabel>
              <FormControl
                value={orderCtx.selectedAddress.floor}
                type="text"
                placeholder="e.g: 2"
              />
            </Form>
            <Form className={classes.text}>
              <FormLabel className=" px-1 fw-bold">DoorBell</FormLabel>
              <FormControl
                value={orderCtx.selectedAddress.doorBellName}
                type="text"
                placeholder="e.g: Papadopoulos"
              />
            </Form>
            <Form className={classes.text}>
              <FormLabel className=" px-1 fw-bold">Phone Number</FormLabel>
              <FormControl
                value={authCtx.phone}
                type="text"
                placeholder="696969696969"
              />
            </Form>
            <Form className={classes.textNotes}>
              <FormLabel className=" px-1 fw-bold">Add notes</FormLabel>
              <FormControl
                onChange={handleChangeNotes}
                value={notes}
                type="text"
                placeholder="Notes"
              />
            </Form>
            <span className="d-flex mx-5 px-5 mt-3">
              {" "}
              <Button
                disabled={!isFormValid}
                type="submit"
                className="my-3"
                variant="warning"
                size="lg"
              >
                Submit Order!
              </Button>{" "}
            </span>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default OrderInfo;
