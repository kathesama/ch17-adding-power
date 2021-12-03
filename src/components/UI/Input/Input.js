/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import React from 'react';
import cssStyle from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const { input } = props;
  return (
    <div className={cssStyle.input}>
      <label htmlFor={input.id}>{props.label}</label>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
