import React from 'react';
import ReactDOM from 'react-dom';

import modalOverlayStyles from './modal-overlay.styles.module.css';

type Props = {
  children: React.ReactElement
}

function ModalOverlay(props: Props) {
  const modalsRoot = document.getElementById('app');
  return modalsRoot ? ReactDOM.createPortal(
    (
      <div className={modalOverlayStyles.container}>{props.children}</div>
    ), modalsRoot) : null;
}

export default ModalOverlay;