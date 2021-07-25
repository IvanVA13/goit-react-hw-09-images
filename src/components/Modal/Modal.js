import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = props => {
  const handleCloseModal = useCallback(
    e => {
      if (e.code === 'Escape' || e.target === e.currentTarget) {
        props.closeModal();
      }
    },
    [props],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  }, [handleCloseModal]);

  return createPortal(
    <div onClick={handleCloseModal} className={styles.Overlay}>
      <div className={styles.Modal}>{props.children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
