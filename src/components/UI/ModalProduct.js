import { useContext } from "react";
import CartContext from "../../store/cart-context";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import classes from "./ModalProduct.module.css";

import React from "react";

const ModalProduct = (props) => {
  return (
    <>
      <Modal show={props.modalShown} onHide={props.hideModalHandler}>
        <Modal.Body>
          <Row>
            <Col className="col-12 d-flex justify-content-center">
              <Image
                className={`d-block m-auto ${classes.iconModal}`}
                src={props.modalProduct.iconUrl}
              ></Image>
            </Col>
          </Row>

          <Row key={props.modalProduct.id} className="py-3">
            <Col className="col-9 d-flex flex-column justify-content-space mx-3">
              <Row>{props.modalProduct.title}</Row>
              <Row>{props.modalProduct.description}</Row>
              <Row>${(props.modalProduct.price * props.amount).toFixed(2)}</Row>
            </Col>
            <Col className="col-3">
              <> </>
            </Col>
            <FormGroup className="pt-3">
              <FormControl
                as="textarea"
                placeholder="Notes"
                rows="3"
                style={{ resize: "none" }}
                value={props.notes}
                onChange={(event) => props.setNotes(event.target.value)}
              />
            </FormGroup>
          </Row>
        </Modal.Body>

        <Row className="p-1 m-1">
          <Col className="col-8 d-flex align-items-center">
            <Button
              variant="secondary"
              className="px-3 mx-3"
              onClick={props.minusAmount}
            >
              -
            </Button>{" "}
            {props.amount}{" "}
            <Button
              variant="secondary"
              className="px-3 mx-3"
              onClick={props.addAmount}
            >
              +
            </Button>
          </Col>
          <Col className="col-4 d-flex align-items-end justify-content-between">
            <Button variant="secondary" onClick={props.hideModalHandler}>
              Close
            </Button>
            <Button onClick={props.addToCartHandler} variant="success">
              Add
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalProduct;
