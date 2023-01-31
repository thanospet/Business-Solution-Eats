import { useContext } from "react";
import classes from "./TotalPriceBudge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Badge, Button } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

const TotalPriceBudge = (props) => {
  const cartCtx = useContext(CartContext);
  //h reduce me afinei na metatrepsw ena array se ena value

  const totalPrice = cartCtx.items.reduce((curPrice, item) => {
    return curPrice + item.price * item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${classes.bump}`;

  return (
    <Button className={btnClasses}>
      <Badge bg="secondary">Total: $ {totalPrice.toFixed(2)}</Badge>
    </Button>
  );
};

export default TotalPriceBudge;
