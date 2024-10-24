import { useEffect } from 'react';
import styles from './ModalDelate.module.css';
import icons from '../../../images/icons/icons.svg';
const Modal = ({ isOpen, onClose, onConfirm, item }) => {
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.headerClose}>
          <h2 className={styles.header}>Delete entry</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg className={styles.iconClose}>
              <use href={`${icons}#close`}></use>
            </svg>
          </button>
        </div>

        <p className={styles.text}>
          Are you sure you want to delete the entry?
        </p>
        <div className={styles.buttons}>
          <button
            onClick={() => onConfirm(item)}
            className={styles.deleteButton}
          >
            Delete
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
