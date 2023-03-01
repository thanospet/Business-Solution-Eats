import { useState, useReducer } from "react";
import OrderContext from "./auth-context";
import axios from "axios";

const defaultOrderState = {
  address: null,
};

const OrderProvider = (props) => {
  const [orderState, dispatcOrderAction] = useReducer(
    orderReducer,
    defaultOrderState
  );
};
