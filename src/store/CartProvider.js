import { useReducer } from "react";

import CartContext from "./cart-context";

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const defaultCartState = {
  items: [],
  totalAmount: 0,
  postalCode: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const { id, title, notes, price, options } = {
      id: action.item.id,
      title: action.item.title,
      notes: action.item.notes,
      price: action.item.price,
      options: action.item.options,
    };
    const updatedActionObject = { id, title, notes, price, options };

    // console.log("updatedActionObject", updatedActionObject);

    const stringifiedProduct = JSON.stringify(updatedActionObject);

    const uniqueProductId = hashCode(stringifiedProduct);

    // console.log("uniqueProductId", uniqueProductId);
    const product = {
      ...action.item,
      uniqueProductId,
    };
    // console.log("productttttttttttt", product);

    const updatedTotalAmount =
      state.totalAmount + product.price * product.amount;

    console.log("state", state.items);

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.uniqueProductId === product.uniqueProductId
    );
    // console.log("existingCartItemIndex", existingCartItemIndex);
    // console.log("product.uniqueProductId", product.uniqueProductId);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    // console.log("existingCartItem", existingCartItem);

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + product.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(product);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.uniqueProductId === action.item.uniqueProductId
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item, index) => {
        console.log("Iteration", index + 1);
        console.log("I want to remove", item.uniqueProductId);
        console.log(
          "Checking",
          item.uniqueProductId,
          action.item.uniqueProductId
        );

        return item.uniqueProductId !== action.item.uniqueProductId;
      });
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // console.log("existingItem", existingItem);

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  if (action.type === "POSTAL") {
    console.log("action.postal", action.postal);
    const updatedPostal = state.postalCode + action.postal;

    return {
      ...state,
      postalCode: updatedPostal,
    };
  }

  return defaultCartState;
};

console.log("defaultCartState", defaultCartState);

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const addPostalToContext = (postal) => {
    dispatchCartAction({ type: "POSTAL", postal: parseInt(postal, 10) });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({ type: "REMOVE", item: item });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    postalCode: cartState.postalCode,
    addPostal: addPostalToContext,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
