import { React, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./AvailableStores.module.css";
import axios from "axios";
import Card from "../UI/Card.module.css";
import CardWrap from "../UI/CardWrap.module.css";

const AvailiableStores = () => {
  const [availiableStores, setAvailiableStores] = useState([]);
  const params = useParams();
  const [isPostalValid, setIsPostalValid] = useState(false);

  const dataPostal = params?.postal;

  const postalCodeRegex = /^\d{5}?$/;

  useEffect(() => {
    if (postalCodeRegex.test(dataPostal)) {
      setIsPostalValid(true);
      axios
      .get(`http://192.168.84.174:5237/api/Store/open-stores/${dataPostal}`)
      .then(function (res) {
        const storesArray = Array.from(res.data.items);
        const newStoresArray = storesArray.map((store) => {
          const newStore = { ...store, logo_icon: store.logoIcon };
          return newStore;
        });
        console.log(res.data.items);

        setAvailiableStores(newStoresArray);
      })
      .catch((err) => {
        console.error(err);
      });
       console.log("okokok")
    }
   
    
  }, [params]);

  const availiableStoresNumber = availiableStores.length;

  return (
    <div className={classes.main}>
      <div>
        <h1 className={classes.header}>
          {!isPostalValid && <h1>Wrong postal code</h1>}
          {isPostalValid && (
            <div>
              {availiableStoresNumber} Availiable Stores in {dataPostal}
            </div>
          )}
        </h1>
      </div>

      {availiableStores.map((store) => {
        return (
          <CardWrap>
            <div className={classes.stores}>
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

export default AvailiableStores;
