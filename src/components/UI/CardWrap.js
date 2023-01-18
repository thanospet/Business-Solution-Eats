import classes from "./CardWrap.module.css";

const CardWrap = (props) => {
  return <div className={classes.cardWrap}>{props.children}</div>;
};

export default CardWrap;