import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import modalStyles from './modal.styles.module.css';

type Props = {
  heading?: string
  children: React.ReactElement
  handleClose: () => void
}

function Modal(props: Props) {
  const modalsRoot = document.getElementById('app');
  const { heading, children, handleClose } = props;

  const escapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escapeClose);
    return () => {
      document.removeEventListener('keydown', escapeClose);
    }
  },[]);

  const renderHeading = () => {
    return (
      <div className={modalStyles.header}>
        {heading &&
          <p className={`${modalStyles.heading} text text_type_main-medium`}>{heading}</p>
        }
        <CloseIcon type="primary" onClick={handleClose} />
      </div>
    )
  }

  return modalsRoot ? ReactDOM.createPortal((
    <>
      <div className={`${modalStyles.container} p-10`}>
        {renderHeading()}
        {children}
      </div>
      <ModalOverlay onClose={handleClose} />
    </>
  ), modalsRoot) : null;

}

export default Modal;