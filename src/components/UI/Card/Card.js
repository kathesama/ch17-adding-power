/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import cssStyle from './Card.module.css';

const Card = (props) => {
  const { children } = props;
  return <div className={cssStyle.card}>{children}</div>;
};

export default Card;
