/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import React, { useContext, useState, useEffect } from 'react';
import CartIcon from '../CartIcon/CartIcon';
import cssStyle from './HeaderCardButton.module.css';
import CartContext from '../../store/CartContext';

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const { onClick } = props;

  // eslint-disable-next-line max-len
  const cartItemsTotal = cartContext.items.reduce((currentValue, item) => currentValue + item.amount, 0);

  const btnClasses = `${cssStyle.button} ${btnIsHighlighted ? cssStyle.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button type="button" className={btnClasses} onClick={onClick}>
      <span className={cssStyle.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={cssStyle.badge}>{cartItemsTotal}</span>
    </button>
  );
};

export default HeaderCardButton;
