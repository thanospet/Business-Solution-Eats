import classes from "./CardProduct.module.css";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const CardProduct = (props) => {
  return (
    <Container className={classes.CardProduct}>{props.children}</Container>
  );
};

export default CardProduct;
