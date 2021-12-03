/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import React from 'react';
import cssStyle from './Overlay.module.css';

const Overlay = (props) => {
  const { children } = props;
  return (
    <div className={cssStyle.modal}>
      <div className={cssStyle.content}>{children}</div>
    </div>
  );
};

export default Overlay;
