import { React, useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import classes from "./AvailableStores.module.css";
import axios from "axios";
import Card from "../UI/Card";
import CardWrap from "../UI/CardWrap";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const AvailableStores = (props) => {
  window.scrollTo(0, 0);
  const [availableStores, setAvailableStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const params = useParams();
  const cartCtx = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const dataPostal = params?.postal;
  console.log(dataPostal);
  const link = "http://localhost:7160";

  useEffect(() => {
    console.log("location", location);
    console.log("location-dataPostal", dataPostal);
    if (location.pathname === `/available-stores/${dataPostal}`) {
      cartCtx.clearCart();
    }
  }, [location]);

  const fetchAvailableStores = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${link}/api/Store/open-stores/${dataPostal}`
      );
      const storesArray = Array.from(res.data.items);
      const newStoresArray = storesArray.map((store) => {
        const newStore = { ...store, logo_icon: store.logoIcon };
        return newStore;
      });
      console.log("AAAAAAAAAAAAAAAAAAAAA", res.data.items);
      setIsLoading(false);
      setAvailableStores(newStoresArray);
      cartCtx.clearCart();
    } catch (error) {
      toast("Error loading stores", {
        duration: 2000,
        type: "error", // trexei kai otan kanw back sto homepage mono gia 0.1 second nomizw
      });
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAvailableStores();
  }, []);

  const handleImageLoad = () => {
    setImageLoading(true);
  };

  const onCardClick = (storeId, storeTitle) => {
    console.log("Clicked");
    navigate(`/store-details/${storeId}`);
    console.log("store", storeId);
  };

  const availableStoresNumber = availableStores.length;

  return (
    <Container className={classes.top}>
      <Toaster />
      <Row>
        <Col className="col-12">
          {" "}
          <div>
            <Row
              className={`d-flex align-items-center justify-content-center ${classes.header}`}
            >
              We found {availableStoresNumber} available stores in {dataPostal}
            </Row>
            {availableStores.length === 0 && (
              <Button
                className={`d-flex align-items-center justify-content-center ${classes.backBtn}`}
                onClick={navigateHome}
              >
                Back to Home
              </Button>
            )}
          </div>
        </Col>
      </Row>
      {/* edw eixa {!isLoading && olo to epomeno Container } */}
      <>
        <Container className={classes.main}>
          {availableStores.map((store) => {
            return (
              <>
                {isLoading ? (
                  <Spinner animation="border" variant="seconadry" />
                ) : (
                  <>
                    {" "}
                    <Row key={store.id}>
                      <Col className="col-12">
                        <div
                          className={classes.stores}
                          onClick={() => onCardClick(store.id)}
                        >
                          <Card key={store.id}>
                            {" "}
                            <span>
                              <img
                                className={classes.imageContainer}
                                src={store.logo_icon}
                                alt=""
                                onLoad={handleImageLoad}
                              />
                            </span>
                            <Row>
                              <span className={classes.storeTitle}>
                                {store.title}
                              </span>
                              <span className={`"${classes.text}`}>
                                Estimated Time: {store.averageDeliveryTime}{" "}
                              </span>
                              <span className={`"${classes.text}`}>
                                {" "}
                                Minimum order: ${store.minimumOrderPrice}{" "}
                              </span>
                            </Row>
                          </Card>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            );
          })}
        </Container>
      </>
    </Container>
  );
};

export default AvailableStores;
