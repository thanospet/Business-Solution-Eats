import classes from "./CardCategory.module.css";
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

const CardCategory = () => {
  return <div className={classes.card}>{props.children}</div>;
};

export default CardCategory;
