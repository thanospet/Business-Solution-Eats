import { React, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import classes from "./AvailableStores.module.css";
import axios from "axios";
import Card from "../UI/Card";
import CardWrap from "../UI/CardWrap";
import 'bootstrap/dist/css/bootstrap.css';


const AvailableStores = () => {
  const [availableStores, setAvailableStores] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

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

  const onCardClick = (storeId) =>{
    
    console.log("Clicked")
    navigate(`/store-details/${storeId}`);
    console.log("store",storeId)
    
  }

  const availableStoresNumber = availableStores.length;


//  const  DUMMY = {
//     "items": [
//       {
//         "id": 7,
//         "title": "Lorem Ipsum",
//         "logoIcon": "https://img.freepik.com/premium-vector/pizzaria-mascot-cartoon-logo_142499-108.jpg?w=2000",
//         "averageDeliveryTime": 0,
//         "minimumOrderPrice": 5
//       },
//       {
//         "id": 8,
//         "title": "Burger House",
//         "logoIcon": "https://media.istockphoto.com/id/987716708/vector/vintage-label-of-burger.jpg?s=612x612&w=0&k=20&c=cBcsLIQ2RJOZcBeJzadwm-zrFie1nMZq_Ug7g8xhrjI=",
//         "averageDeliveryTime": 0,
//         "minimumOrderPrice": 8
//       },
//       {
//         "id": 9,
//         "title": "Kazuma Sushi",
//         "logoIcon": "https://images-platform.99static.com//F0tBadirIlOL4UhkVmVyNCNBeJo=/32x0:1022x990/fit-in/500x500/99designs-contests-attachments/76/76625/attachment_76625447",
//         "averageDeliveryTime": 0,
//         "minimumOrderPrice": 10
//       },
//       {
//         "id": 10,
//         "title": "KebaBoss",
//         "logoIcon": "https://cdna.artstation.com/p/assets/images/images/013/020/142/medium/jonathan-israel-johnson-kebaboss-logo-bela-kontura-normal.jpg?1537689772",
//         "averageDeliveryTime": 0,
//         "minimumOrderPrice": 7
//       },
//       {
//         "id": 11,
//         "title": "Coffee Island",
//         "logoIcon": "https://www.coffeeisland.gr/assets/img/social/home.jpg",
//         "averageDeliveryTime": 0,
//         "minimumOrderPrice": 6
//       },
//       {
//         "id": 12,
//         "title": "Headquarter",
//         "logoIcon": "https://images-platform.99static.com//TYnyGv2kSItT3ukG7CZQoRN-ieI=/0x0:1000x1000/fit-in/500x500/99designs-contests-attachments/124/124735/attachment_124735108",
//         "averageDeliveryTime": 0,
//         "minimumOrderPrice": 8
//       }
//     ],
//     "validationResult": [],
//     "httpResultCode": 200,
//     "errorDetails": null,
//     "success": true
//   }


//   const dummyArray = Array.from(DUMMY.items);
//   const newDummyArray = dummyArray.map((store) => {
//   const newDummy = { ...store, logo_icon: store.logoIcon }
// return newDummy
// });

//   console.log(newDummyArray)


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
            <div  className={classes.stores} onClick={()=>onCardClick(store.id)}>
              <Card >
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
                  {store.category}{" "}
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
