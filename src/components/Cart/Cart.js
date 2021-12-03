/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import React, { useContext, useState } from 'react';
import ModalComponent from '../UI/Modal/ModalComponent';
import CartContext from '../../store/CartContext';
import CartItem from '../CartItem/CartItem';

import cssStyle from './Cart.module.css';
import CheckoutComponent from '../Checkout/Checkout';
import useFetchHttp from '../../hooks/use-fetch-http/use-fetch-http';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const { isLoading, error, sendRequest: fetchTasks } = useFetchHttp();
  const { onClose } = props;
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartContextVar = cartContext.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    >
      {item.name}
    </CartItem>
  ));

  const cartItems = <ul className={cssStyle['cart-items']}>{cartContextVar}</ul>;

  const modalActions = (
    <div className={cssStyle.actions}>
      <button type="button" className={cssStyle['button--alt']} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button type="button" className={cssStyle.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (clientData) => {
    const response = await fetchTasks({
      url: 'https://react-api-k-default-rtdb.firebaseio.com/orders.json',
      method: 'POST',
      body: {
        client: clientData,
        orderedItems: cartContext.items,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!error) {
      setDidSubmit(true);
      cartContext.clearCart();
    }
  };

  const cartModalContent = (
    <>
      {cartItems}
      <div className={cssStyle.total}>
        <span>TotalAmount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <CheckoutComponent onConfirm={submitOrderHandler} onCancel={onClose} />}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmittingModalContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={cssStyle.actions}>
        <button type="button" className={cssStyle['button--alt']} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <ModalComponent onClose={onClose}>
      {!isLoading && !didSubmit && cartModalContent}
      {!isLoading && didSubmit && didSubmittingModalContent}
      {isLoading && isSubmittingModalContent}
    </ModalComponent>
  );
};

export default Cart;
