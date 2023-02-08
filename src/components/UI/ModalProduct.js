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
  Label,
  Input,
} from "react-bootstrap";
import classes from "./ModalProduct.module.css";

import React from "react";

const ModalProduct = (props) => {
  const cartCtx = useContext(CartContext);
  console.log("props.optionCategories", props.optionCategories);
  const [radioChoice, setRadioChoice] = useState({});
  const [checkboxChoice, setCheckboxChoice] = useState({});
  const [amount, setAmount] = useState(1);
  const [notes, setNotes] = useState("");
  const [extraPrice, setExtraPrice] = useState(0);
  const [totalExtraPrice, setTotalExtraPrice] = useState(0);

  useEffect(() => {
    setTotalExtraPrice(totalExtraPrice + extraPrice);
  }, [extraPrice]);

  console.log("totalExtraPrice", totalExtraPrice);

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

  const addToCartHandler = () => {
    props.hideModalHandler();
    cartCtx.addItem({
      id: props.modalProduct.id,
      title: props.modalProduct.title,
      amount: amount,
      notes: notes,
      price: props.modalProduct.price,
    });

    console.log("amount", amount);
    setAmount(1);
    setNotes("");
  };
  console.log("extraPrice", extraPrice);

  const removeFromCartHandler = (item) => {
    cartCtx.removeItem(item);
  };

  console.log("radioChoice", radioChoice);
  console.log("checkboxChoice", checkboxChoice);

  const handleRadio = (ingredient) => {
    setRadioChoice(ingredient);
  };

  const handleCheckbox = (ingredient) => {
    setCheckboxChoice(ingredient);
  };

  const renderGroupIngredients = (group) => {
    if (group.ingredientCategoryType === "radio") {
      return (
        <>
          <Form key={group.ingredientCategoryType.id}>
            {group.ingredients.map((ingredient) => (
              <Row className="d-flex">
                <Col className="col-12">
                  <label key={ingredient.id} className="form-check-label p-1">
                    <input
                      onChange={() => {
                        handleRadio(ingredient);
                        setExtraPrice(ingredient.ingredientPrice);
                      }}
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      className="form-check-input"
                    />
                    <Row className="d-flex justify-content-start">
                      <Col className="col-6 mx-3 px-2">
                        {ingredient.ingredientTitle}
                        {}
                      </Col>
                      <Col className="col-6 mx-3 px-2">
                        {ingredient.ingredientPrice}$
                      </Col>
                    </Row>
                  </label>
                </Col>
              </Row>
            ))}
          </Form>
        </>

        // <div>
        //   geia sou eimai radio{" "}
        //   {group.ingredients
        //     .map((ingredient) => ingredient.ingredientTitle)
        //     .join(", ")}
        // </div>
      );
    }

    return (
      <>
        <Form key={group.ingredientCategoryType.id}>
          {group.ingredients.map((ingredient) => (
            <label key={ingredient.id} className="form-check-label p-1">
              <input
                onChange={() => {
                  handleCheckbox(ingredient);
                  setExtraPrice(ingredient.ingredientPrice);
                }}
                type="checkbox"
                name="flexCheckDefault"
                id="flexCheckDefault1"
                className="form-check-input"
              />
              <Row className="">
                <Col className="col-12 mx-3 px-2">
                  {ingredient.ingredientTitle}
                  {}
                  {ingredient.ingredientPrice}$
                </Col>
              </Row>
            </label>
          ))}
        </Form>

        {/* <Form>
          {group.ingredients.map((ingredient) => (
            <label className="form-check-label p-1">
              <input
                type="checkbox"
                name="flexCheckDefault"
                id="flexCheckDefault1"
                className="form-check-input"
              />
              {ingredient.ingredientTitle} {ingredient.ingredientPrice}$
            </label>
          ))}
        </Form> */}
      </>
      // <div>
      //   geia sou eimai checkbox{" "}
      //   {group.ingredients
      //     .map((ingredient) => ingredient.ingredientTitle)
      //     .join(", ")}
      // </div>
    );
  };

  return (
    <>
      <Modal show={props.modalShown} onHide={props.hideModalHandler} size="lg">
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
              <Row>${(props.modalProduct.price * amount).toFixed(2)}</Row>
            </Col>
            <Col className="col-12">
              <>
                {" "}
                <hr></hr>
              </>
            </Col>
            {props.optionCategories.map((optionCategory) => {
              return (
                <Row className="edw einai ta extra option categories">
                  <Col className="col-12 p-1">
                    {" "}
                    <h5>{optionCategory.ingredientCategoryTitle}</h5>
                  </Col>

                  <Col className="col-12 p-1">
                    {renderGroupIngredients(optionCategory)}
                    <hr></hr>
                    {/* 
                    {optionCategory.ingredientCategoryType === "radio"
                      ? "eimai radio"
                      : "eimai cb"} */}
                  </Col>
                </Row>
              );
            })}

            <FormGroup className="pt-3">
              <FormControl
                as="textarea"
                placeholder="Notes"
                rows="3"
                style={{ resize: "none" }}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </FormGroup>
          </Row>
        </Modal.Body>

        <Row className="p-1 m-1">
          <Col className="col-8 d-flex align-items-center">
            <Button
              variant="secondary"
              className="px-3 mx-3"
              onClick={minusAmount}
            >
              -
            </Button>{" "}
            {amount}{" "}
            <Button
              variant="secondary"
              className="px-3 mx-3"
              onClick={addAmount}
            >
              +
            </Button>
          </Col>
          <Col className="col-4 d-flex align-items-end justify-content-between">
            <Button
              variant="secondary"
              onClick={() => {
                setNotes("");
                props.hideModalHandler();
              }}
            >
              Close
            </Button>
            <Button onClick={addToCartHandler} variant="success">
              Add
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalProduct;
