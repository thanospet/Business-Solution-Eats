import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const StoreDetails = () => {
  const [storeLogoIcon, setStoreLogoIcon] = useState("");
  const [minimumOrderPrice, setMinimumOrderPrice] = useState();
  const [storeTitle, setStoreTitle] = useState("");
  const [averageDeliveryTime, setAverageDeliveryTime] = useState("");
  const [productCategories, setProductCategories] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const storeInfoId = params?.storeId;
  console.log("storeInfoId", storeInfoId);

  useEffect(() => {
    axios
      .get(`http://192.168.84.174:5237/api/Store/store-info/${storeInfoId}`)
      .then(function (res) {
        console.log("res", res.data);
        setProductCategories(res.data.item.productCategories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {productCategories.map((productCategory) => {
        return (
          <Container className="fluid px-0">
            <Row className="align-items-center ">
              <Col className="col-3 align-items-center">
               col 3
              </Col>
              <Col className="col-6 align-items-center">
               <div key={productCategory}>
                {productCategory.title}
                
                </div>
              </Col>

              <Col className="col-3 align-items-center">
                  cart
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
};

export default StoreDetails;
