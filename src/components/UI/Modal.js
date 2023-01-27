import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useRef, useState, useEffect } from "react";
import Input from "./Input";
import "bootstrap/dist/css/bootstrap.css";
import classes from "./Modal.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import ProductForm from "./ProductForm";

const Backdrop = (props) => {
  // console.log("onClick={props.onClickClose}");
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
  const [product, setProducts] = useState({});
  const cartCtx = useContext(CartContext);

  // const [amountIsValid, setAmountIsValid] = useState(true);
  // const amountInputRef = useRef();

  // console.log("apo to modal!", props.modalProduct);

  // const submitHandler = (event) => {
  //   event.preventDefault();

  // addToCartHandler(enteredAmountNumber);
  // const enteredAmount = amountInputRef.current.value;
  // const enteredAmountNumber = +enteredAmount;

  // if (
  //   enteredAmount.trim().length === 0 ||
  //   enteredAmountNumber < 1 ||
  //   enteredAmountNumber > 5
  // ) {
  //   setAmountIsValid(false);
  //   return;
  // }
  // console.log("enteredAmountNumber", enteredAmount);
  // props.onAddToCart(enteredAmountNumber);
  // };

  const addToCartHandler = (amount) => {
    setProducts(props.modalProduct);
    cartCtx.addItem({
      id: props.modalProduct.id,
      title: props.modalProduct.title,
      amount: amount,
      price: props.modalProduct.price,
    });

    console.log("product", product);
  };

  console.log(props.modalProduct);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
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
              <ProductForm
                // id={props.id}
                onAddToCart={addToCartHandler}
                modalThisProduct={product}
              />
              {/* <Form className={classes.form} onSubmit={submitHandler}>
                <Input
                  ref={amountInputRef}
                  label="Amount"
                  input={{
                    id: "amount_" + props.modalProduct.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                  }}
                />
                <Button onClick={addToCartHandler}>+ Add</Button>
                {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
              </Form> */}
            </Col>
          </Row>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
