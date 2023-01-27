import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./StoreDetails.module.css";
import CardProduct from "../UI/CardProduct";
// import Modal from "../UI/Modal";
import ProductInfoModal from "../UI/ProductInfoModal";
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
  Modal,
} from "react-bootstrap";
import Cart from "../cart/Cart";

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

  const navigate = useNavigate();
  const params = useParams();
  const storeInfoId = params?.storeId;
  const cartCtx = useContext(CartContext);

  const link = "https://localhost:7160";

  useEffect(() => {
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
  }, []);

  const modalHandler = (product) => {
    setModalProduct(product);
    setModalShown(true);

    console.log("Clicked modalHandler", product);
    console.log("setModalShown", modalShown);
  };

  const hideModalHandler = () => {
    if (modalShown === true) {
      setModalShown(false);
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
    cartCtx.addItem({
      id: modalProduct.id,
      title: modalProduct.title,
      amount: amount,
      price: modalProduct.price,
    });

    console.log("amount", amount);
  };

  return (
    <Container>
      {
        // <ProductInfoModal modalShown={modalShown} />
        // <Modal onClose={hideModalHandler} modalProduct={modalProduct} //
        <>
          <Modal show={modalShown} onHide={hideModalHandler}>
            <Modal.Body>
              <Row>
                <Col className="col-12 d-flex justify-content-center">
                  <Image
                    className={`d-block m-auto ${classes.icon}`}
                    src={modalProduct.iconUrl}
                  ></Image>
                </Col>
              </Row>

              <Row key={modalProduct.id} className="py-3">
                <Col className="col-8 d-flex flex-column justify-content-space">
                  <Row>{modalProduct.title}</Row>
                  <Row>{modalProduct.description}</Row>
                  <Row>${modalProduct.price}</Row>
                </Col>
                <Col className="col-4">
                  <>
                    {" "}
                    <Button onClick={minusAmount}>-</Button> {amount}{" "}
                    <Button onClick={addAmount}>+</Button>
                  </>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideModalHandler}>
                Close
              </Button>
              <Button onClick={addToCartHandler} variant="primary">
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      }

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
                          <div> {productCategory.title}</div>
                          <hr></hr>{" "}
                          {productCategory.products.map((product) => {
                            return (
                              <Row
                                key={product.id}
                                className="py-3"
                                onClick={() => modalHandler(product)}
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
          <Cart />
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDetails;

/* <Container className="my-5">
<Row className="align-items-center d-flex flex-column ">
  <Col className="col-8 d-flex items-align-center">
    <Image
      className={`d-block m-auto ${classes.logoIcon}`}
      src={storeLogoIcon}
    ></Image>
  </Col>
  <Col className="col-4 d-flex justify-content-center"></Col>
</Row>

/* ----------------------------------------------- */

/* <Container className="fluid px-0 py-3">
  <Row className="align-items-center ">
    <Col className="col-4 d-flex justify-content-center"></Col>
    <Col className="col-4 d-flex justify-content-center ">
      {storeTitle}
    </Col>
    <Col className="col-4 d-flex justify-content-center flex-column">
      <Cart />
    </Col>
  </Row>
</Container>  */

{
  /* ----------------------------------------------- */
}

{
  /* {productCategories.map((productCategory) => {
  return (
    <Container key={productCategory.id} className="fluid px-0 py-5 my-5">
      <Row className="align-items-center ">
        <Col className="col-8 d-flex justify-content-between">
          <Col className="col-12">
            <div> {productCategory.title}</div>
            <hr></hr>{" "}
            {productCategory.products.map((product) => {
              return (
                <Row key={product.id} className="p-3">
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
</Container> */
}
