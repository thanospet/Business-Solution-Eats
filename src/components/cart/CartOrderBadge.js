import { useContext } from "react";
import classes from "./CartOrderBadge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Badge, Button } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

const CartOrderBadge = (pops) => {
  const navigate = useNavigate();
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

  const onCheckOut = (event) => {
    event.preventDefault();
    navigate(`/check-out-page`);
  };

  return (
    <Button onClick={onCheckOut} className={btnClasses}>
      <span className={`${classes.badge} mx-4`}>{numberOfCartItems}</span>
      <span className="mx-4">Continue</span>
      <Badge className="mx-4" bg="secondary">
        $ {totalPrice.toFixed(2)}
      </Badge>
    </Button>
  );
};

export default CartOrderBadge;
