import { React, useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import classes from "./AvailableStores.module.css";
import axios from "axios";
import Card from "../UI/Card";
import CardWrap from "../UI/CardWrap";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import { Container, Row, Col, Modal } from "react-bootstrap";

const AvailableStores = (props) => {
  window.scrollTo(0, 0);
  const [availableStores, setAvailableStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const location = useLocation();

  const dataPostal = params?.postal;
  console.log(dataPostal);
  const link = "https://localhost:7160";

  useEffect(() => {
    console.log("location", location);
    console.log("location-dataPostal", dataPostal);

    if (location.pathname === `/available-stores/${dataPostal}`) {
      cartCtx.clearCart();
    }
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${link}/api/Store/open-stores/${dataPostal}`)
      .then(function (res) {
        const storesArray = Array.from(res.data.items);
        const newStoresArray = storesArray.map((store) => {
          const newStore = { ...store, logo_icon: store.logoIcon };

          return newStore;
        });
        console.log(res.data.items);
        setIsLoading(false);

        setAvailableStores(newStoresArray);
        cartCtx.clearCart();
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const onCardClick = (storeId, storeTitle) => {
    console.log("Clicked");
    navigate(`/store-details/${storeId}`);
    console.log("store", storeId);
  };

  const availableStoresNumber = availableStores.length;
  const loadingText = <p>Loading...</p>;

  return (
    <Container className={classes.top}>
      <Row>
        <Col className="col-12">
          {" "}
          <div>
            <Row
              className={`d-flex align-items-center justify-content-center ${classes.header}`}
            >
              We found {availableStoresNumber} available stores in {dataPostal}
            </Row>
          </div>
        </Col>
      </Row>
      <Container className={classes.main}>
        {availableStores.map((store) => {
          return (
            <>
              {!isLoading && (
                <>
                  {" "}
                  {isLoading && loadingText}
                  <Row key={store.id}>
                    <Col className="col-12">
                      <CardWrap>
                        <div
                          className={classes.stores}
                          onClick={() => onCardClick(store.id)}
                        >
                          <Card key={store.id}>
                            <span></span>
                            <span>
                              <img
                                src={store.logo_icon}
                                alt=""
                                height={100}
                                width={100}
                                fluid
                              />{" "}
                              <span className={classes.storeTitle}>
                                {store.title}
                              </span>
                            </span>
                          </Card>
                          <Card>
                            <span className={classes.textCategory}>
                              {store.masterProductCategory}{" "}
                            </span>
                            <span className={classes.text}>
                              Estimated Time: {store.averageDeliveryTime}{" "}
                            </span>
                            <span className={classes.text}>
                              {" "}
                              minimum order: ${store.minimumOrderPrice}{" "}
                            </span>
                          </Card>
                        </div>
                      </CardWrap>
                    </Col>
                  </Row>
                </>
              )}
            </>
          );
        })}
      </Container>
    </Container>
  );
};

export default AvailableStores;
