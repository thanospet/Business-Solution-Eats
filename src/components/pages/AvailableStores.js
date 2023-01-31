import { React, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./AvailableStores.module.css";
import axios from "axios";
import Card from "../UI/Card";
import CardWrap from "../UI/CardWrap";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";

const AvailableStores = () => {
  const [availableStores, setAvailableStores] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);

  const dataPostal = params?.postal;

  console.log(dataPostal);

  const link = "https://localhost:7160";

  useEffect(() => {
    axios
      .get(`${link}/api/Store/open-stores/${dataPostal}`)
      .then(function (res) {
        const storesArray = Array.from(res.data.items);
        const newStoresArray = storesArray.map((store) => {
          const newStore = { ...store, logo_icon: store.logoIcon };

          return newStore;
        });
        console.log(res.data.items);

        setAvailableStores(newStoresArray);
        cartCtx.clearCart();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onCardClick = (storeId, storeTitle) => {
    console.log("Clicked");
    navigate(`/store-details/${storeId}`);
    console.log("store", storeId);
  };

  const availableStoresNumber = availableStores.length;

  return (
    <div className={classes.main}>
      <div>
        <h1 className={classes.header}>
          We found {availableStoresNumber} Available stores in {dataPostal}
        </h1>
      </div>

      {availableStores.map((store) => {
        return (
          <CardWrap key={store.id}>
            <div
              className={classes.stores}
              onClick={() => onCardClick(store.id)}
            >
              <Card>
                <span key={store.id}></span>
                <span>
                  <img
                    src={store.logo_icon}
                    alt=""
                    height={100}
                    width={100}
                    fluid
                  />{" "}
                  <span className={classes.storeTitle}>{store.title}</span>
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
        );
      })}
    </div>
  );
};

export default AvailableStores;
