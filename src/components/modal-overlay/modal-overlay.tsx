import React from 'react';


import modalOverlayStyles from './modal-overlay.module.css';

type Props = {
  onClose: () => void
}

function ModalOverlay(props: Props) {
  const { onClose } = props;

  return (<div className={modalOverlayStyles.container} onClick={onClose} />);
}

export default ModalOverlay;