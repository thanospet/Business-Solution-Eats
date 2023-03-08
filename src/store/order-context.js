import React from "react";

const OrderContext = React.createContext({
  selectedAddress: null,
  addresses: [],
  addAddressOrder: (item) => [],
  removeAddressOrder: (item) => {},
  selectAddressOrder: (item) => {},
});

export default OrderContext;
