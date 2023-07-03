import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  postalCode: "",
  addItem: (item) => {},
  removeItem: (id) => {},
  addPostal: (postal) => {},
  clearCart: () => {},
});

export default CartContext;
