import { FC } from 'react';

import modalOverlayStyles from './modal-overlay.module.css';

type Props = {
  onClose: () => void
}

const ModalOverlay: FC<Props> = ({ onClose }) => {
  return <div className={modalOverlayStyles.container} onClick={onClose} />;
}

export default ModalOverlay;