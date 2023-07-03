import classes from "./CardCategory.module.css";
import "bootstrap/dist/css/bootstrap.css";


const CardCategory = () => {
  return <div className={classes.card}>{props.children}</div>;
};

export default CardCategory;
