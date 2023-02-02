import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  postalCode: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) =>
        item.id === action.item.id &&
        JSON.stringify(item.notes) === JSON.stringify(action.item.notes)
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item === action.item
      //&& JSON.stringify(item.notes) === JSON.stringify(action.item.notes)
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item, index) => {
        console.log("Iteration", index + 1);
        console.log("I want to remove", action.id);
        console.log("Checking", item.id, action.id);

        return (
          item !== action.item
          // && JSON.stringify(item.notes) !== JSON.stringify(action.item.notes)
        );
      });
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    console.log("existingItem", existingItem);

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return { ...state, defaultCartState };
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

// console.log("postal", postalCode);
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
