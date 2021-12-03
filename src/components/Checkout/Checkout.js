/*
Created by: kathe
On: 29-Nov-21 : 29-Nov-21
Project: ch17-adding-power
*/
import React from 'react';
import cssStyle from './Checkout.module.css';
import useInputForm from '../../hooks/use-input-form/use-input-form';

const isNotEmpty = (value) => value.trim() !== '';
const isFiveChars = (value) => value.trim().length > 4;

const CheckoutComponent = (props) => {
  const { onCancel, onConfirm } = props;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInputForm(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInputForm(isNotEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInputForm(isFiveChars);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInputForm(isNotEmpty);

  let formIsValid = false;

  if (enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid) {
    formIsValid = true;
  }

  const orderHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();

    onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameInputClasses = nameInputHasError ? `${cssStyle.control} ${cssStyle.invalid}` : cssStyle.control;
  const streetInputClasses = streetInputHasError ? `${cssStyle.control} ${cssStyle.invalid}` : cssStyle.control;
  const cityInputClasses = cityInputHasError ? `${cssStyle.control} ${cssStyle.invalid}` : cssStyle.control;
  const postalCodeInputClasses = postalCodeInputHasError ? `${cssStyle.control} ${cssStyle.invalid}` : cssStyle.control;

  return (
    <form className={cssStyle.form} onSubmit={orderHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your name</label>
        {/* eslint-disable-next-line max-len */}
        <input type="text" id="name" placeholder="Name" onChange={nameChangedHandler} onBlur={nameBlurHandler} value={enteredName} />
        {nameInputHasError && <p className={cssStyle.errorText}>Name must not be empty.</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        {/* eslint-disable-next-line max-len */}
        <input type="text" id="street" placeholder="Street" onChange={streetChangedHandler} onBlur={streetBlurHandler} value={enteredStreet} />
        {streetInputHasError && <p className={cssStyle.errorText}>Street must not be empty.</p>}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          placeholder="Postal code"
          onChange={postalCodeChangedHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {/* eslint-disable-next-line max-len */}
        {postalCodeInputHasError && <p className={cssStyle.errorText}>Postal code must not be empty and greater than 4 chars.</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        {/* eslint-disable-next-line max-len */}
        <input type="text" id="city" placeholder="City" onChange={cityChangedHandler} onBlur={cityBlurHandler} value={enteredCity} />
        {cityInputHasError && <p className={cssStyle.errorText}>City must not be empty.</p>}
      </div>
      <div className={cssStyle.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={cssStyle.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default CheckoutComponent;
