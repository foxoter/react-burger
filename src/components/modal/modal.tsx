import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import modalStyles from './modal.module.css';
import { useHistory } from 'react-router-dom';

type Props = {
  heading?: string
  children: React.ReactElement
  handleClose?: () => void
}

function Modal(props: Props) {
  const modalsRoot = document.getElementById('app');
  const { heading, children, handleClose } = props;
  const history = useHistory();

  const escapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }

  const onClose = handleClose ? handleClose : history.goBack;

  useEffect(() => {
    document.addEventListener('keydown', escapeClose);
    return () => {
      document.removeEventListener('keydown', escapeClose);
    }
  },[]);

  const renderHeading = () => {
    return (
      <div className={modalStyles.header}>
        <p className={`${modalStyles.heading} text text_type_main-medium`}>{heading || 'Детали ингредиента'}</p>
        <CloseIcon type="primary" onClick={onClose} />
      </div>
    )
  }

  return modalsRoot ? ReactDOM.createPortal((
    <>
      <div className={`${modalStyles.container} p-10`}>
        {renderHeading()}
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>
  ), modalsRoot) : null;

}

export default React.memo(Modal);