import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./AvailableStores.module.css";
import axios from "axios";
import Card from "../UI/Card";
import CardWrap from "../UI/CardWrap";

const AvailableStores = () => {
  const [availableStores, setAvailableStores] = useState([]);
  const params = useParams();

  const dataPostal = params?.postal;
  console.log(dataPostal);

  useEffect(() => {
    axios
      .get(`http://192.168.84.174:5237/api/Store/open-stores/${dataPostal}`)
      .then(function (res) {
        const storesArray = Array.from(res.data.items);
        const newStoresArray = storesArray.map((store) => {
          const newStore = { ...store, logo_icon: store.logoIcon };
          return newStore;
        });
        console.log(res.data.items);

        setAvailableStores(newStoresArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const availableStoresNumber = availableStores.length;

  return (
    <div className={classes.main}>
      <div>
        <h1 className={classes.header}>
          {availableStoresNumber} Availiable Stores in {dataPostal}
        </h1>
      </div>

      {availableStores.map((store) => {
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

export default AvailableStores;
