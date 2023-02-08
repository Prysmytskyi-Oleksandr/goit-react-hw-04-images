import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

// export const Modal = ({ children, close }) => {
//   const closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       close();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', closeModal);

//     return () => {
//       document.removeEventListener('keydown', closeModal);
//     };
//   }, [closeModal]);

//   return createPortal(
//     <div onClick={closeModal} className={styles.overlay}>
//       <div className={styles.modal}> {children}</div>
//     </div>,
//     modalRoot
//   );
// };

// Modal.propTypes = {
//   close: PropTypes.func.isRequired,
//   children: PropTypes.element.isRequired,
// };

// const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;
    const { closeModal } = this;

    return createPortal(
      <div onClick={closeModal} className={styles.overlay}>
        <div className={styles.modal}> {children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
