import { useState, useReducer } from "react";
import OrderContext from "./order-context";
import axios from "axios";

const defaultOrderState = {
  selectedAddress: {}, //na pernw olo to item gia to auto complete meta
  addresses: [],
};

const orderReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log("order provider action.type ADD");
    console.log("action item", action.item);
    return {
      ...state,
      addresses: action.item,
    };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      //LOGIC GIA REMOVE----NA TSEKAREI SELECTED ID(OXI TO SELECTED ADDRESS GENIKA TOU USER)
    };
  }

  if (action.type === "SELECT") {
    return {
      ...state,
      selectedAddress: action.item,
    };
  }

  return defaultOrderState;
};

console.log("state.addresses", defaultOrderState);

const OrderProvider = (props) => {
  const [orderState, dispatcOrderAction] = useReducer(
    orderReducer,
    defaultOrderState
  );

  const addAddressOrder = (item) => {
    dispatcOrderAction({ type: "ADD", item: item });
  };

  const removeAddressOrder = (item) => {
    dispatcOrderAction({ type: "REMOVE", item: item });
  }; // mallon addr.id

  const selectAddressOrder = (item) => {
    dispatcOrderAction({ type: "SELECT", item: item });
  }; // mallon addr.id

  const orderContext = {
    ...orderState,
    addAddressOrder: addAddressOrder,
    removeAddressOrder: removeAddressOrder,
    selectAddressOrder: selectAddressOrder,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
