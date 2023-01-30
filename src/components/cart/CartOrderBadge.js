import { useContext } from "react";
import classes from "./CartOrderBadge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Badge } from "react-bootstrap";

import CartContext from "../../store/cart-context";

const CartOrderBadge = (props) => {
  const cartCtx = useContext(CartContext);
  //h reduce me afinei na metatrepsw ena array se ena value
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  console.log("cartCtx.items", cartCtx.items);

  const totalPrice = cartCtx.items.reduce((curPrice, item) => {
    return curPrice + item.price * item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${classes.bump}`;

  console.log("numberOfCartItems", numberOfCartItems);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.badge}>{numberOfCartItems}</span>
      <span>Continue</span>
      <Badge bg="secondary">Total: $ {totalPrice.toFixed(2)}</Badge>
    </button>
  );
};

export default CartOrderBadge;
