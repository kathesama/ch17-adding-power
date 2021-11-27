/**
 * Created by: kathe
 * On: 26-Nov-21 : 3:06 PM
 * Project: chapter16-input-data
 */

/**
 * Example for a form with a simple input field
 * const isNotEmpty = (value) => value.trim() !== '';
 *
 * const SimpleInput = (props) => {
 * const {
 *    value: enteredName,
 *    isValid: enteredNameIsValid,
 *    hasError: nameInputHasError,
 *    valueChangeHandler: nameChangedHandler,
 *    inputBlurHandler: nameBlurHandler,
 *    reset: resetNameInput,
 *  } = useInputForm(isNotEmpty);
 *
 * let formIsValid = false;
 *
 *  if (enteredNameIsValid) {
 *    formIsValid = true;
 *  }
 *
 *  const formSubmissionHandler = (event) => {
 *    event.preventDefault();
 *
 *    if (!enteredNameIsValid) {
 *      return;
 *    }
 *
 *    resetNameInput();
 *  }
 *
 *  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
 *
 *  return (
 *    <form onSubmit={formSubmissionHandler}>
 *      <div className={nameInputClasses}>
 *        <label htmlFor="name">Your Name</label>
 *        <input
 *           type="text" id="name"
 *           onChange={nameChangedHandler}
 *           onBlur={nameBlurHandler}
 *           value={enteredName} />
 *        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
 *      </div>
 *      <div className="form-actions">
 *        <button type="submit" disabled={!formIsValid}>
 *          Submit
 *        </button>
 *      </div>
 *    </form>
 *  );
 *};
 *
 * export default SimpleInput;
 */

import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const init = () => initialInputState;

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }

  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }

  return inputStateReducer;
};

const useInputForm = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState, init);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputForm;
