import React from 'react';
import ReactDOM from 'react-dom';

import modalOverlayStyles from './modal-overlay.styles.module.css';

type Props = {
  onClose: () => void
}

function ModalOverlay(props: Props) {
  const modalsRoot = document.getElementById('app');
  const { onClose } = props;

  return modalsRoot ? ReactDOM.createPortal(
    (
      <div className={modalOverlayStyles.container} onClick={onClose} />
    ), modalsRoot) : null;
}

export default ModalOverlay;