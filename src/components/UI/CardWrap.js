import classes from "./CardWrap.module.css";
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

const CardWrap = (props) => {
  return <div className={classes.cardWrap}>{props.children}</div>;
};

export default CardWrap;
