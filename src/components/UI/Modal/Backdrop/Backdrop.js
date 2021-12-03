/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import cssStyle from '../ModalComponent.module.css';

const Backdrop = (props) => {
  const { onClose } = props;
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  return <div className={cssStyle.backdrop} onClick={onClose} />;
};

export default Backdrop;
