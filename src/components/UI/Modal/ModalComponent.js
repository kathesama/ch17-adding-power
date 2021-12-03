/*
Created by: kathe
On: 28-Jul-21 : 28-Jul-21
Project: meals-order-section11
*/
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop/Backdrop';
import Overlay from './Overlay/Overlay';

const ModalComponent = (props) => {
  const portalElement = document.getElementById('overlays');
  const { onClose, children } = props;

  return (
    /* eslint-disable-next-line */
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<Overlay>{children}</Overlay>, portalElement)}
    </Fragment>
  );
};

export default ModalComponent;
