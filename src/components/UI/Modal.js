import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import Input from "./Input";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  console.log("onClick={props.onClickClose}");
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    // props.onAddToCart(enteredAmountNumber);
  };

  console.log(props.modalProduct);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onclose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <Row>
            <Col className="col-12 d-flex justify-content-center">
              <Image
                className={`d-block m-auto ${classes.icon}`}
                src={props.modalProduct.iconUrl}
              ></Image>
            </Col>
          </Row>

          <Row key={props.modalProduct.id} className="py-3">
            <Col className="col-8 d-flex flex-column justify-content-space">
              <Row>{props.modalProduct.title}</Row>
              <Row>{props.modalProduct.description}</Row>
              <Row>${props.modalProduct.price}</Row>
            </Col>
            <Col className="col-4">
              <Form className={classes.form} onSubmit={submitHandler}>
                <Input
                  ref={amountInputRef}
                  label="Amount"
                  input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                  }}
                />
                <Button>+ Add</Button>
                {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
              </Form>
            </Col>
          </Row>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;

// <Row key={props.modalProduct.id} className="py-3">
// <Col className="col-8 d-flex flex-column justify-content-space">
//   <Row>{props.modalProduct.title}</Row>

//   <Row>${props.modalProduct.price}</Row>
// </Col>
// <Col className="col-4 ">
//   <Image
//     className={`d-block m-auto ${classes.icon}`}
//     src={props.modalProduct.iconUrl}
//   ></Image>
// </Col>
// </Row>
