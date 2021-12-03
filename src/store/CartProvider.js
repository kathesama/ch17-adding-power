/*
Created by: kathe
On: 06-Oct-21 : 06-Oct-21
Project: meals-order-section11
*/
import React, { useReducer } from 'react';
import CartContext from './CartContext';

/* const stateInitializer = (initialState) => ({
     initialState,
   }); */

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const existsProperty = (objToScan, propertyToSearch) =>
  // eslint-disable-next-line no-prototype-builtins,implicit-arrow-linebreak
  objToScan.hasOwnProperty(propertyToSearch);

const getExistingCartItem = (state, action) => {
  const id = existsProperty(action, 'item') ? action.item.id : action.id;

  const existingCartItemIndex = state.items.findIndex((item) => item.id === id);
  const existingCartItem = state.items[existingCartItemIndex];

  return {
    index: existingCartItemIndex,
    item: existingCartItem,
  };
};

const cartReducer = (state, action) => {
  let updatedItems;

  switch (action.type) {
    case 'ADD_CART_ITEM':
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      const { index: addIndex, item: addItem } = getExistingCartItem(state, action);

      if (addItem) {
        updatedItems = [...state.items];

        const updatedItem = {
          ...addItem,
          amount: addItem.amount + action.item.amount,
        };

        updatedItems[addIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case 'REMOVE_CART_ITEM':
      const { index: removeIndex, item: removeItem } = getExistingCartItem(state, action);

      if (removeItem) {
        // eslint-disable-next-line no-shadow
        const updatedTotalAmount = state.totalAmount - removeItem.price;

        if (removeItem.amount === 1) {
          updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
          updatedItems = [...state.items];
          updatedItems[removeIndex] = { ...removeItem, amount: removeItem.amount - 1 };
        }

        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }

      return defaultCartState;
    case 'CLEAR_CART_ITEM':
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

const CartProviderComponent = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState, () => defaultCartState);
  const { children } = props;

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD_CART_ITEM',
      item,
    });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE_CART_ITEM',
      id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR_CART_ITEM' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};
export default CartProviderComponent;
