import { useContext } from "react";
import CartContext from "../../store/cart-context";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {
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
  const cartCtx = useContext(CartContext);
  // console.log("props.optionCategories", props.optionCategories);
  // const [radioChoicesArray, setRadioChoicesArray] = useState([]);
  // const [checkboxChoicesArray, setCheckboxChoicesArray] = useState([]);
  const [options, setOptions] = useState({});
  const [amount, setAmount] = useState(1);
  const [notes, setNotes] = useState("");
  const [extraPrice, setExtraPrice] = useState(0);
  const [totalExtraPrice, setTotalExtraPrice] = useState(0);
  const [optionCategories, setOptionCategories] = useState([]);

  const link = "https://localhost:7160";

  useEffect(() => {
    axios
      .get(`${link}/api/Product/productIngredientInfo/${props.modalProduct.id}`)
      .then(function (res) {
        setOptionCategories(res.data.items);
        console.log("res.data.items", res.data.items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.modalShown]);

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
      options: options,
    });

    console.log("amount", amount);
    setAmount(1);
    setNotes("");
  };
  console.log("extraPrice", extraPrice);

  // let objArray = [];
  // const handleRadio = (ingredient, group) => {
  //   const index = objArray.findIndex(
  //     (item) => Object.keys(item)[0] === group.ingredientCategoryId
  //   );
  //   if (index === -1) {
  //     objArray.push({ [group.ingredientCategoryId]: ingredient.ingredientId });
  //   } else {
  //     objArray[index][group.ingredientCategoryId] = ingredient.ingredientId;
  //   }
  //   setOptions([...objArray]);

  // };

  // let objArray = [];
  // let obj = {};

  const handleRadio = (ingredient, group) => {
    setOptions((prevOptions) => {
      const temp = { ...prevOptions };

      temp[group.ingredientCategoryId] = ingredient.ingredientId;

      return temp;
    });

    // options: {2: 5}
    // options: {2: 5, 3: [1, 60, 1020]}

    return;
    // obj = { [group.ingredientCategoryId]: ingredient.ingredientId };
    // const index = objArray.findIndex(
    //   (obj) => Object.keys(obj)[0] === group.ingredientCategoryId
    // );
    // if (index === -1) {
    //   objArray = [...objArray, obj];
    //   setOptions(...objArray);
    // }
  };
  console.log("options", options);

  const handleCheckbox = (ingredient, group) => {
    setOptions((prevOptions) => {
      const temp = { ...prevOptions };

      if (temp[group.ingredientCategoryId]?.includes(ingredient.ingredientId)) {
        temp[group.ingredientCategoryId] = temp[
          group.ingredientCategoryId
        ].filter((id) => id !== ingredient.ingredientId);
      } else {
        temp[group.ingredientCategoryId] = [
          ...(temp[group.ingredientCategoryId] || []),
          ingredient.ingredientId,
        ];
      }

      return temp;
    });
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
                        handleRadio(ingredient, group);
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
      );
    }

    return (
      <>
        <Form key={group.ingredientCategoryType.id}>
          {group.ingredients.map((ingredient) => (
            <label key={ingredient.id} className="form-check-label p-1">
              <input
                onChange={() => {
                  handleCheckbox(ingredient, group);
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
      </>
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
            {optionCategories.map((optionCategory) => {
              return (
                <Row className="edw einai ta extra option categories">
                  <Col className="col-12 p-1">
                    {" "}
                    <h5>{optionCategory.ingredientCategoryTitle}</h5>
                  </Col>

                  <Col className="col-12 p-1">
                    {renderGroupIngredients(optionCategory)}
                    <hr></hr>
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
          <Col className="col-6 d-flex justify-content-start">
            <Button variant="light" className="px-2 mx-2" onClick={minusAmount}>
              -
            </Button>
            <span className="px-1 mx-1">{amount}</span>
            <Button variant="light" className="px-2 mx-2" onClick={addAmount}>
              +
            </Button>
          </Col>
          <Col className="col-6 d-flex align-items-end justify-content-end">
            <Button
              className="mx-3 d-flex align-items-center justify-content-center"
              variant="light"
              onClick={() => {
                setNotes("");
                props.hideModalHandler();
              }}
            >
              Close
            </Button>
            <Button
              onClick={addToCartHandler}
              variant="light"
              className={`mx-3 d-flex align-items-center justify-content-center ${classes.addBtn}`}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalProduct;
