import { useContext } from "react";
import classes from "./CartOrderBadge.module.css";

import CartContext from "../../store/cart-context";

const CartOrderBadge = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${classes.bump}`;

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.badge}>{numberOfCartItems}</span>
      <span>Total :</span>
      <span>$ 19.99</span>
    </button>
  );
};

export default CartOrderBadge;
