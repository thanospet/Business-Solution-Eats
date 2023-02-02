import React from "react";
import classes from "./EmptyCart.module.css";
import emptycart from "../../assets/emptycart.png";
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
const EmptyCart = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center ">
        <Image
          className={`d-flex sticky-top ${classes["main-image"]}`}
          src={emptycart}
          alt=""
        ></Image>
      </Row>
    </Container>
  );
};

export default EmptyCart;
