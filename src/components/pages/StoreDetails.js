import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./StoreDetails.module.css";
import CardProduct from "../UI/CardProduct";
import Modal from "../UI/Modal";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Cart from "../cart/Cart";
import { propTypes } from "react-bootstrap/esm/Image";

const StoreDetails = (props) => {
  const [storeLogoIcon, setStoreLogoIcon] = useState("");
  const [storeTitle, setStoreTitle] = useState("");
  const [minimumOrderPrice, setMinimumOrderPrice] = useState();
  const [averageDeliveryTime, setAverageDeliveryTime] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [masterProductCategory, setMasterProductCategory] = useState("");
  const [modalShown, setModalShown] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  const navigate = useNavigate();
  const params = useParams();
  const storeInfoId = params?.storeId;

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
    setModalShown(true);
    setModalProduct(product);
    console.log("Clicked modalHandler", product);
    console.log("setModalShown", modalShown);
  };

  const hideModalHandler = () => {
    console.log("Container click");
    if (modalShown === true) {
      setModalShown(false);
    } else {
      return;
    }
  };

  return (
    <Container onClick={hideModalHandler}>
      {modalShown && (
        <Modal onClose={props.onClose} modalProduct={modalProduct} />
      )}
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
