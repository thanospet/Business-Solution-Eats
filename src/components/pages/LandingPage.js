import React from "react";
import classes from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AuthContext from "../../store/auth-context";
import OrderContext from "../../store/order-context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import GoogleMapComponent from "../FormAddress/GoogleMapComponent";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
  Spinner,
} from "react-bootstrap";
import CartContext from "../../store/cart-context";
import FormAddress from "../FormAddress/FormAddress";

const LandingPage = (props) => {
  const authCtx = useContext(AuthContext);
  const orderCtx = useContext(OrderContext);
  const [googleMapAddress, setGoogleMapAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isPostalValid, setIsPostalValid] = useState(false);
  const [error, setError] = useState("");
  const cartCtx = useContext(CartContext);
  const pattern = /^[0-9a-zA-Z]+$/;
  const [show, setShow] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddresses] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navigateHome = () => {
    console.log("KALESTIKA navigateHome");
    navigate("/");
  };

  console.log(postalCode);

  useEffect(() => {
    if (authCtx.registerSuccess) {
      toast("Registration Successfull!", {
        type: "success",
      });
    }
  }, [authCtx.registerSuccess]);

  const getAuthFunc = async () => {
    setIsLoading(true);
    try {
      const token = authCtx.authToken;

      const res = await axios.get(
        "http://localhost:7160/api/GetUserWithAuth/UserAuth",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("AXIOS GET AUTH DATA", res.data);
      console.log("TOKEN", token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast("User not authenticated", {
        duration: 2000,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (authCtx.authToken) {
      getAuthFunc();
    }
  }, [authCtx.authToken]);

  // console.log("authCtx.registerSuccess", authCtx.registerSuccess);

  const handleClose = () => {
    setShow(false);
    setShowAddressModal(false);
  };

  const handlePostalValidation = () => {
    if (postalCode) {
      setIsPostalValid(true);
      setError("");
    } else {
      setShow(true);
      setIsPostalValid(false);
      setError(
        "Postal code must be 5 characters long and can only contain letters and numbers."
      );
    }
  };
  const onSubmitHandle = (event) => {
    console.log("isPostalValid", isPostalValid);
    event.preventDefault();
    // if (isPostalValid) {
    cartCtx.addPostal(postalCode);
    navigate(`/available-stores/${postalCode}`);
    // } else {
    //   setShow(true);
    // }
  };

  const onOpenModal = () => {
    fetchAddresses();
    authCtx.toggleShowModal();
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const closeModal = () => {
    setShowAddressModal(false);
  };

  const handleDropDown = (address) => {
    setSelectedAddresses(address);
    setPostalCode(address.postalCodeId);
    orderCtx.selectAddressOrder(address);
    console.log("address", address);
    console.log("postalCodeId", address.postalCodeId);
  };

  // const searchPostalCode = (event) => {
  //   setPostalCode(event.target.value);
  // };

  // const handleSelectedAddress = (address) => {
  //   console.log("address handle select dropdown", address);
  //   setSelectedAddresses(address);
  //   // orderCtx.selectAddressOrder()
  // };

  // get user addresses

  const fetchAddresses = async () => {
    const token = authCtx.authToken;
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:7160/api/Address/Addresses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("ADDRESSES", res.data.items);
      setAddresses(res.data.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      if (authCtx.authToken) {
        toast("Failed to load addresses !", {
          duration: 2000,
          type: "error", //edw exei thema an ginei mia fora register trexei to toast,na trexei mono an exei token prepei
        });
      }
    }
  };

  useEffect(() => {
    console.log("location", location);
    if (location.pathname === `/` && authCtx.isLoggedIn) {
      fetchAddresses();
      orderCtx.addAddressOrder(addresses);
    }
  }, [location, authCtx.isLoggedIn]);

  console.log("authCtx", authCtx);
  console.log("orderCtx", orderCtx);

  return (
    <>
      <Container>
        <Toaster />
        <Modal
          //add address modal
          show={showAddressModal}
          onHide={handleClose}
          // backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Row>
            <Col className="col-12">
              {" "}
              <Modal.Body>
                {" "}
                <FormAddress
                  onCloseModal={closeModal}
                  onNavigateHome={navigateHome}
                />
              </Modal.Body>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 px-4"> </Col>
          </Row>
        </Modal>

        <Modal
          //error with postal modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Oops...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Postal code must be 5 characters long and can only contain letters
            and numbers.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="mx-0">
          <Col className="col-lg-6">
            <div
              id="headingGroup"
              class="text-white text-center d-none d-lg-block mt-2"
            >
              <h1>
                <div className={classes["landing-page-h1"]}></div>
                <div className={classes["landing-page-form"]}>
                  <h1>Food, takeaway and groceries. Delivered.</h1>

                  {authCtx.isLoggedIn ? (
                    <Form
                      className={classes["landing-page-form"]}
                      onSubmit={onSubmitHandle}
                    >
                      <h4 className="pb-2">
                        Welcome back, {authCtx.firstName}
                      </h4>

                      {isLoading ? (
                        <Spinner animation="border" variant="secondary" />
                      ) : (
                        <DropdownButton
                          size="large"
                          className={`${classes.dropdownAddresses}`}
                          title={
                            selectedAddress
                              ? `${selectedAddress.streetName} ${selectedAddress.postalCodeId}`
                              : "Select an address"
                          }
                          variant="outline-secondary"
                        >
                          {addresses.map((address, idx) => {
                            return (
                              <>
                                {isLoading ? (
                                  <Spinner
                                    animation="border"
                                    variant="primary"
                                  />
                                ) : (
                                  <Dropdown.Item
                                    key={idx}
                                    eventKey={address.postalCodeId}
                                    onClick={() => {
                                      handleDropDown(address);
                                    }}
                                  >
                                    {address.city}
                                    <span> </span>
                                    {address.streetName}
                                    <span> </span>
                                    {address.postalCodeId}
                                    <span> </span>
                                  </Dropdown.Item>
                                )}
                              </>
                            );
                          })}
                        </DropdownButton>
                      )}

                      <span className={`${classes.spanButtons}`}>
                        <Button
                          onClick={handleAddAddress}
                          className={classes["landing-btn"]}
                          type="button"
                        >
                          <span
                            style={{
                              paddingBottom: "2px",
                              paddingLeft: "1px",
                              marginTop: "4px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              textAlign: "center",
                              marginRight: "10px",
                            }}
                          >
                            +
                          </span>
                          Add address
                        </Button>
                        <Button
                          onClick={(event) => {
                            handlePostalValidation();
                            onSubmitHandle(event);
                          }}
                          className={classes["landing-btn"]}
                          type="submit"
                        >
                          Search!
                        </Button>
                      </span>
                    </Form>
                  ) : (
                    <Form className={classes["landing-page-form"]}>
                      <h2>
                        Welcome to Business Solutions Eats! Sign in or register
                        to continue...
                      </h2>
                      {authCtx.registerSuccess ? (
                        <Button variant="warning" onClick={onOpenModal}>
                          Account set up completed! Sign in to continue.
                        </Button>
                      ) : (
                        <Button variant="warning" onClick={onOpenModal}>
                          Add account
                        </Button>
                      )}
                    </Form>
                  )}
                </div>
              </h1>
            </div>
          </Col>
          <Col className="col-lg-6">
            <Image
              className={`d-flex align-items-end ${classes["main-image"]}`}
              src=""
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;
