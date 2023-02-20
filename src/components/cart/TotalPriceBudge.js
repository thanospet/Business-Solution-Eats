import { useContext } from "react";
import classes from "./TotalPriceBudge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Badge, Button } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

const TotalPriceBudge = (props) => {
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((curPrice, item) => {
    return curPrice + item.price * item.amount;
  }, 0);

  const divClasses = `${classes.div} ${classes.bump}`;

  return <div className={divClasses}>Total: $ {totalPrice.toFixed(2)}</div>;
};

export default TotalPriceBudge;
