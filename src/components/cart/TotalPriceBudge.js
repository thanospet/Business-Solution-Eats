import { useContext } from "react";
import classes from "./TotalPriceBudge.module.css";
import "bootstrap/dist/css/bootstrap.css";
import CartContext from "../../store/cart-context";

const TotalPriceBudge = () => {
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((curPrice, item) => {
    return curPrice + item.price * item.amount;
  }, 0);

  const divClasses = `${classes.div} ${classes.bump}`;

  return <div className={divClasses}>Total: $ {totalPrice.toFixed(2)}</div>;
};

export default TotalPriceBudge;
