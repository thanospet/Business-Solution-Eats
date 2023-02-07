import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./StoreDetails.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
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
import Cart from "../cart/Cart";
import ModalProduct from "../UI/ModalProduct";

const StoreDetails = (props) => {
  const [storeLogoIcon, setStoreLogoIcon] = useState("");
  const [storeTitle, setStoreTitle] = useState("");
  const [minimumOrderPrice, setMinimumOrderPrice] = useState();
  const [averageDeliveryTime, setAverageDeliveryTime] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [masterProductCategory, setMasterProductCategory] = useState("");
  const [modalShown, setModalShown] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [notes, setNotes] = useState("");

  // const [error, setError] = useState(null);

  window.scrollTo(0, 0);

  const navigate = useNavigate();
  const params = useParams();
  const storeInfoId = params?.storeId;
  const cartCtx = useContext(CartContext);

  const link = "https://localhost:7160";

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${link}/api/Store/store-info/${storeInfoId}`)
      .then(function (res) {
        console.log("res", res.data);
        setStoreLogoIcon(res.data.item.logoIcon);
        setStoreTitle(res.data.item.title);
        setMinimumOrderPrice(res.data.item.minimumOrderPrice);
        setAverageDeliveryTime(res.data.item.averageDeliveryTime);
        setProductCategories(res.data.item.productCategories);
        setMasterProductCategory(res.data.item.masterProductCategory);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log("location");
  }, []);

  const modalHandler = (product) => {
    setModalProduct(product);
    setModalShown(true);

    console.log("Clicked modalHandler", product);
    console.log("setModalShown", modalShown);
  };

  const onShowModal = () => {
    setModalShown(true);
  };

  const hideModalHandler = () => {
    if (modalShown === true) {
      setModalShown(false);
      setAmount(1);
      setNotes("");
    } else {
      return;
    }
  };

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
    setModalShown(false);
    cartCtx.addItem({
      id: modalProduct.id,
      title: modalProduct.title,
      amount: amount,
      notes: notes,
      price: modalProduct.price,
    });

    console.log("amount", amount);
    setAmount(1);
    setNotes("");
  };

  const removeFromCartHandler = (item) => {
    cartCtx.removeItem(item);
  };

  return (
    <Container>
      <ModalProduct
        modalProduct={modalProduct}
        addToCartHandler={addToCartHandler}
        hideModalHandler={hideModalHandler}
        addAmount={addAmount}
        minusAmount={minusAmount}
        onShowModal={onShowModal}
        modalShown={modalShown}
        notes={notes}
        setNotes={setNotes}
        amount={amount}
      />
      <Row className="my-4">
        <Col className={`col-8 ${classes.colInfo}`}>
          <Row className="align-items-center">
            <Col className="col-12 d-flex items-align-center">
              <Image
                className={`d-block m-auto my-5 ${classes.logoIcon}`}
                src={storeLogoIcon}
              ></Image>
            </Col>
            <Col
              className={`col-12 d-flex items-align-center${classes.storeTitle}`}
            >
              {storeTitle}
            </Col>

            <Col className="col-12 d-flex justify-content-start">
              {productCategories.map((productCategory) => {
                return (
                  <Container
                    key={productCategory.id}
                    className="fluid py-5 my-5"
                  >
                    <Row className="align-items-center ">
                      <Col className="col-8 d-flex justify-content-between">
                        <Col className="col-12">
                          <div>{productCategory.title}</div>
                          <hr />
                          {productCategory.products.map((product) => {
                            return (
                              <Row
                                key={product.id}
                                className="py-3"
                                onClick={() => modalHandler(product)} //kanw click edw kai sto modalHandler logika na valw to axios get gia ta options
                              >
                                <Col className="col-8 ">
                                  <Row>{product.title}</Row>
                                  <Row>$ {product.price}</Row>
                                </Col>

                                <Col className="col-4 ">
                                  <Image
                                    className={`d-block m-auto ${classes.icon}`}
                                    src={product.iconUrl}
                                  ></Image>
                                </Col>
                              </Row>
                            );
                          })}
                        </Col>
                      </Col>
                    </Row>
                  </Container>
                );
              })}
            </Col>
          </Row>
        </Col>

        <Col
          className={`col-4 d-flex justify-content-center ${classes.colCart}`}
        >
          <Cart
            onShowModal={onShowModal}
            onAddAmount={addAmount}
            onMinusAmount={minusAmount}
            onAddToCartHandler={(item) =>
              cartCtx.addItem({ ...item, amount: 1 })
            }
            onRemoveFromCart={removeFromCartHandler}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDetails;
