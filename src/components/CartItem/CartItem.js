import classes from './CartItem.module.css';

const CartItem = (props) => {
  // eslint-disable-next-line
  const { name, amount, onRemove, onAdd } = props;

  // eslint-disable-next-line react/destructuring-assignment
  const price = `$${(+props.price).toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onRemove}>
          −
        </button>
        <button type="button" onClick={onAdd}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
