import { useDispatch } from 'react-redux';
import css from './UserLogoutModal.module.css';
import { logoutUser } from '../../redux/auth/operations';
import { MODAL_NAME } from '../../constants';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { useEffect, useCallback } from 'react';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape') {
      //onClose();
      onClose(MODAL_NAME.LOGOUT_MODAL);
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [handleEscKey]);


  const handleLogout = () => {
    dispatch(logoutUser());
    onClose(MODAL_NAME.LOGOUT_MODAL);
    localStorage.clear();
  };

  const handleCloseModal = () => {
    onClose(MODAL_NAME.LOGOUT_MODAL);
  };
  
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      handleCloseModal();
    }
  };


  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.logout_wrap}>
        <button className={css.close_btn} onClick={handleCloseModal}>
          <IoClose size={24} /> {/* Іконка закриття */}
        </button>
        <div className={css.logout_texts__block}>
          <h3>{t('Log out')}</h3>
          <p>{t('Do you really want to leave?')}</p>
        </div>
        <div className={css.buttons_block}>
          <button
            className={`${css.button} ${css.btn_logout}`}
            onClick={handleLogout}
          >
            {t('Log out')}
          </button>
          <button
            className={`${css.button} ${css.btn_cancel}`}
            onClick={handleCloseModal}
          >
            {t('Cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;