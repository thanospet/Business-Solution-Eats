import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./StoreDetails.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import Cart from "../cart/Cart";
import ModalProduct from "../UI/ModalProduct";
import toast, { Toaster } from "react-hot-toast";

const StoreDetails = (props) => {
  const [storeLogoIcon, setStoreLogoIcon] = useState("");
  const [storeTitle, setStoreTitle] = useState("");
  const [minimumOrderPrice, setMinimumOrderPrice] = useState();
  const [averageDeliveryTime, setAverageDeliveryTime] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [masterProductCategory, setMasterProductCategory] = useState("");
  const [modalShown, setModalShown] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  window.scrollTo(0, 0);

  const params = useParams();
  const storeInfoId = params?.storeId;

  const link = "http://localhost:7160";

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    axios
      .get(`${link}/api/Store/store-info/${storeInfoId}`)
      .then(function (res) {
        console.log("resBBBBBBBBBBBBBBB", res.data.item);
        setStoreLogoIcon(res.data.item.logoIcon);
        setStoreTitle(res.data.item.title);
        setMinimumOrderPrice(res.data.item.minimumOrderPrice);
        setAverageDeliveryTime(res.data.item.averageDeliveryTime);
        setProductCategories(res.data.item.productCategories);
        setMasterProductCategory(res.data.item.masterProductCategory);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        if (modalShown) {
          //den to prolabainei logika , isws an vrw kati mapo to context na exw gia sinthiki
          // toast("Error loading store details ", {
          //   duration: 2000,
          //   type: "error",
          // });
        }
      });

    // console.log("location");
  }, []);

  const modalHandler = (product) => {
    setModalProduct(product);
    setModalShown(true);
  };

  const hideModalHandler = () => {
    if (modalShown) {
      setModalShown(false);
    }
  };

  return (
    <Container>
      {/* <Toaster /> */}
      <ModalProduct
        modalProduct={modalProduct}
        hideModalHandler={hideModalHandler}
        modalShown={modalShown}
      />
      <Row className="my-4">
        {isLoading ? (
          <Spinner
            className={classes.spinner}
            animation="border"
            variant="secondary"
          />
        ) : (
          <Col className={`col-8 ${classes.colInfo}`}>
            <Row className={`align-items-center`}>
              <Col className="col-12 d-flex items-align-center">
                <Image
                  className={`d-block m-auto mt-5 ${classes.logoIcon}`}
                  src={storeLogoIcon}
                ></Image>
              </Col>
              <Col
                className={`col-12 d-flex justify-content-center mt-2 ${classes.storeTitle}`}
              >
                <div>
                  <h3>{storeTitle}</h3>
                </div>
              </Col>
              <Col
                className={`col-12 d-flex justify-content-evenly mt-3 ${classes.storeInformation}`}
              >
                {" "}
                <h5 className="text-muted ">
                  Minimum order price: ${minimumOrderPrice}
                </h5>
                <h5 className="text-muted ">
                  Average delivery time: {averageDeliveryTime}
                </h5>
              </Col>

              <Col className={`col-12 d-flex justify-content-center `}>
                {productCategories.map((productCategory) => {
                  return (
                    <Container
                      key={productCategory.id}
                      className="fluid py-5 my-5 justify-content-between"
                    >
                      <Row className="align-items-center ">
                        <Col className="col-10 d-flex justify-content-between">
                          <Col className="col-12 ">
                            <h4>{productCategory.title}</h4>
                            <hr />
                            {productCategory.products.map((product) => {
                              return (
                                <Row
                                  key={product.id}
                                  className={`py-3 ${classes.mainItems} align-items-center`}
                                  onClick={() => modalHandler(product)}
                                >
                                  <Col className="px-5 col-8 justify-content-center">
                                    <Row className="d-flex fw-bold">
                                      {product.title}
                                    </Row>
                                    <Row className="text-muted small">
                                      from: ${product.price.toFixed(2)}
                                    </Row>
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
        )}

        <Col
          className={`col-4 d-flex justify-content-center ${classes.colCart}`}
        >
          <Cart modalProduct={modalProduct} />
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDetails;
