import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import modalStyles from './modal.styles.module.css';

type Props = {
  withHeading?: boolean
  children: React.ReactElement
  handleClose: () => void
}

function Modal(props: Props) {
  const { withHeading, children, handleClose } = props;

  const renderHeading = () => {
    return (
      <div className={modalStyles.header}>
        {withHeading &&
          <p className={`${modalStyles.heading} text text_type_main-medium`}>Детали ингердиента</p>
        }
        <CloseIcon type="primary" onClick={handleClose} />
      </div>
    )
  }

  return (
    <>
      <div className={`${modalStyles.container} p-10`}>
        {renderHeading()}
        {children}
      </div>
      <ModalOverlay onClose={handleClose} />
    </>
  )
}

export default Modal;