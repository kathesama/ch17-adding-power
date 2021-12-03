/*
Created by: kathe
On: 06-Oct-21 : 06-Oct-21
Project: meals-order-section11
*/
import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  // eslint-disable-next-line no-unused-vars
  addItem: (item) => {},
  // eslint-disable-next-line no-unused-vars
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
