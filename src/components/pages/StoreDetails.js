import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const STORE_INFO = {
  item: {
    id: 11,
    title: "Coffee Island",
    logoIcon: "https://www.coffeeisland.gr/assets/img/social/home.jpg",
    averageDeliveryTime: 0,
    minimumOrderPrice: 6,
    masterProductCategory: "DRINKS",
    productCategories: [
      {
        id: 53,
        title: "Coffee Def",
        hotness: 9,
        products: [
          {
            id: 14,
            title: "Freddo cappuccino",
            description: "Ice cold Freddo Cappuccino",
            price: 2.4,
            iconUrl:
              "https://imageproxy.wolt.com/menu/menu-images/624e987e779848d88b1e7aae/08601eec-bbdd-11ec-b882-664104c9d2d8_freddo_cappuccino_krema__1_.jpeg",
            hotness: 7,
          },
          {
            id: 13,
            title: "Freddo espresso",
            description: "Ice cold Freddo Espresso",
            price: 2.3,
            iconUrl:
              "http://www.fatepaketo.gr/Images/Menu/Espresso_freddo_56cb36c733c69.jpg",
            hotness: 7,
          },
          {
            id: 15,
            title: "Iced latte",
            description: "Ice cold Iced latte",
            price: 2,
            iconUrl:
              "https://imageproxy.wolt.com/menu/menu-images/5fc668c20c3bbb295adb87fd/f828a95e-8555-11eb-a975-62230f122cae_thumbnail_image3__5_.jpeg",
            hotness: 5,
          },
        ],
      },
      {
        id: 55,
        title: "Coffe Island Snacks",
        hotness: 5,
        products: [
          {
            id: 21,
            title: "Apple pie",
            description: "Delicious Apple pie",
            price: 3,
            iconUrl:
              "https://kristineskitchenblog.com/wp-content/uploads/2021/04/apple-pie-1200-square-592-2.jpg",
            hotness: 3,
          },
          {
            id: 20,
            title: "Croissant",
            description: "Delicious croissant",
            price: 2.5,
            iconUrl:
              "https://biancolievito.com/wp-content/uploads/2016/04/shutterstock_574919893.jpg",
            hotness: 3,
          },
          {
            id: 19,
            title: "Energy bar",
            description: "Delicious Energy bar",
            price: 1.2,
            iconUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uOfAf-6TE9rC5y2-FKSCE3ZdeHlEep9q4Q&usqp=CAU",
            hotness: 2,
          },
        ],
      },
    ],
  },
  httpResultCode: 200,
  errorDetails: null,
  success: true,
  validationResult: null,
};

const storeArray = Array.from(STORE_INFO.item.productCategories);
const newStoreArray = storeArray.map((productCategorie) => {
  const newStore = { ...productCategorie };
  console.log("productCategories", productCategorie);
  return newStore;
});

console.log("newStoreArray", newStoreArray);

const StoreDetails = () => {
  const params = useParams();
  const storeInfoId = params?.storeId;

  {
    newStoreArray.map((productCategorie) => {
      let id=11
      return (
        <>
          <Container className="fluid px-0">
            <Row className="align-items-center ">
              <Col className="col-12 align-items-center">
                <div key={productCategorie.id}>{productCategorie.title}</div>
                
              </Col>
            </Row>
          </Container>
        </>
      );
    });
  }
};

export default StoreDetails;
