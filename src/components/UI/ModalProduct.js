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
  FormLabel,
} from "react-bootstrap";
import classes from "./ModalProduct.module.css";

import React from "react";

const ModalProduct = (props) => {
  const cartCtx = useContext(CartContext);
  const [options, setOptions] = useState({});
  const [amount, setAmount] = useState(1);
  const [notes, setNotes] = useState("");
  const [optionCategories, setOptionCategories] = useState([]);
  const [extraPrice, setExtraPrice] = useState(0);

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

  useEffect(() => {
    let total = 0;
    Object.values(options).forEach((option) => {
      option.forEach((item) => {
        total += item.extraPrice;
        console.log("total", total);
      });
    });
    setExtraPrice(total);
  }, [options]);

  const addToCartHandler = () => {
    props.hideModalHandler();
    cartCtx.addItem({
      id: props.modalProduct.id,
      title: props.modalProduct.title,
      amount: amount,
      notes: notes,
      price: props.modalProduct.price + extraPrice,
      options: options,
    });

    console.log("options", options);
    console.log("amount", amount);
    setAmount(1);
    setExtraPrice(0);
    setOptions({});
    setNotes("");
  };

  console.log("extraPrice", extraPrice);

  const handleRadio = (ingredient, group) => {
    setOptions((prevOptions) => {
      const temp = { ...prevOptions };
      console.log("group.ingredientCategoryId", group.ingredientCategoryId);
      temp[group.ingredientCategoryId] = [
        {
          ingId: ingredient.ingredientId,
          extraPrice: ingredient.ingredientPrice,
        },
      ];
      return temp;
    });
    return;
  };

  // const temp = { ...prevOptions };
  // if (temp[group.ingredientCategoryId]?.includes(ingredient.ingredientId)) {
  // const newArray = temp[group.ingredientCategoryId].filter(
  //   (element) => element.ingId !== ingredient.ingredientId
  // );

  // temp[group.ingredientCategoryId] = newArray;

  console.log("options", options);

  const handleCheckbox = (ingredient, group) => {
    setOptions((prevOptions) => {
      // I create a copy of the previous options in order to manipulate them
      const temp = { ...prevOptions };

      // If it's the first time for this ingredient category,
      // just create the array with the selected ingredient
      if (!temp[group.ingredientCategoryId]) {
        temp[group.ingredientCategoryId] = [
          {
            ingId: ingredient.ingredientId,
            extraPrice: ingredient.ingredientPrice,
          },
        ];

        return temp;
      }

      // I check if the clicked ingredient is already selected
      const alreadyExists = temp[group.ingredientCategoryId].find(
        (element) => element.ingId === ingredient.ingredientId
      );

      // If it doesn't exist, we have to APPEND/PUSH it to the existing array
      if (!alreadyExists) {
        temp[group.ingredientCategoryId] = [
          ...temp[group.ingredientCategoryId],
          {
            ingId: ingredient.ingredientId,
            extraPrice: ingredient.ingredientPrice,
          },
        ];

        return temp;
      }

      // If already exists, remove it from the array
      const newArray = temp[group.ingredientCategoryId].filter(
        (element) => element.ingId !== ingredient.ingredientId
      );

      temp[group.ingredientCategoryId] = newArray;

      return temp;
    });
  };

  const renderGroupIngredients = (group) => {
    if (group.ingredientCategoryType === "radio") {
      return (
        <>
          <Form key={group.ingredientCategoryType.id}>
            {group.ingredients.map((ingredient) => (
              <Row className="">
                <FormLabel
                  key={ingredient.id}
                  className="form-check-label px-1 d-flex align-items-center"
                >
                  <input
                    onChange={() => {
                      handleRadio(ingredient, group);
                    }}
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    className="form-radio-input me-3"
                  />
                  <div className="d-inline-block me-3">
                    <span className="fw-bold">
                      {ingredient.ingredientTitle}
                    </span>
                    <span> </span>
                    {ingredient.ingredientPrice === 0 ? (
                      <span> </span>
                    ) : (
                      <span>${ingredient.ingredientPrice}</span>
                    )}
                  </div>
                </FormLabel>
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
                className={`${classes.myCheckbox}`}
              />
              <div className="d-inline-block me-3">
                <span className="px-2 fw-bold">
                  {ingredient.ingredientTitle}
                </span>
                <span> </span>
                {ingredient.ingredientPrice === 0 ? (
                  <span> </span>
                ) : (
                  <span>${ingredient.ingredientPrice}</span>
                )}
              </div>
            </label>
          ))}
        </Form>
      </>
    );
  };

  return (
    <>
      <Modal
        show={props.modalShown}
        onHide={() => {
          props.hideModalHandler();
          setExtraPrice(0);
          setOptions({});
          setNotes("");
        }}
        size="lg"
      >
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
              <Row className="fw-bold fs-5">{props.modalProduct.title}</Row>
              <Row>{props.modalProduct.description}</Row>

              <h5 className="py-1 my-1 fw-bold ">
                ${((extraPrice + props.modalProduct.price) * amount).toFixed(2)}
              </h5>
            </Col>
            <Col className="col-12">
              <>
                {" "}
                <hr></hr>
              </>
            </Col>
            {optionCategories.map((optionCategory) => {
              return (
                <Row className="d-flex justify-content-center">
                  <Col className="col-12">
                    <h5>{optionCategory.ingredientCategoryTitle}</h5>
                    {renderGroupIngredients(optionCategory)}
                  </Col>
                  <Col className="col-12">
                    <Row></Row>
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
            <Button
              size="lg"
              variant="light"
              className="px-3 mx-2"
              onClick={minusAmount}
            >
              -
            </Button>
            <span className="d-flex align-items-center px-1 mx-1">
              {amount}
            </span>
            <Button variant="light" className="px-3 mx-2 " onClick={addAmount}>
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
              size="md"
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
