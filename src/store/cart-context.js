import React from "react";

const CartContext = React.createContext({
  //auta einai mono gia auto completion oso grafoume kodika !!
  //den einai auta pou pernoun ta updates!!
  //Ta kanonika einai auta mesa
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
