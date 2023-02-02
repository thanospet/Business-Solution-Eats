import { useContext } from "react";
import classes from "./CartOrderBadge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Badge, Button } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

const CartOrderBadge = (props) => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  //h reduce me afinei na metatrepsw ena array se ena value
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // const uid = cartCtx.items.reduce((curID, item) => {
  //   return JSON.stringify(curID + item.notes);
  // }, 0);

  // console.log("uid", uid);
  console.log("cartCtx.items", cartCtx.items);

  const totalPrice = cartCtx.items.reduce((curPrice, item) => {
    return curPrice + item.price * item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${classes.bump}`;

  console.log("numberOfCartItems", numberOfCartItems);

  const onCheckOut = (event) => {
    event.preventDefault();
    navigate(`/check-out-page`);
  };

  return (
    <Button onClick={onCheckOut} className={btnClasses}>
      <span className={classes.badge}>{numberOfCartItems}</span>
      <span>Continue</span>
      <Badge bg="secondary">Total: $ {totalPrice.toFixed(2)}</Badge>
    </Button>
  );
};

export default CartOrderBadge;
