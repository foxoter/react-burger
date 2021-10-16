import { memo, FC, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

type Props = {
  children: ReactNode
  heading?: string
  handleClose?: () => void
}

const Modal: FC<Props> = ({ heading, handleClose, children }) => {
  const modalsRoot = document.getElementById('app');
  const history = useHistory();
  const onClose = handleClose ? handleClose : history.goBack;

  const escapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
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

export default memo(Modal);