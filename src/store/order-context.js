import React from "react";

const OrderContext = React.createContext({
  addressAddedSuccess: false,
  address: {},
  addAddress: () => {},
});

export default OrderContext;
