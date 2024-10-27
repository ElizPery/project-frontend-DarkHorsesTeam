import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalOpen, selectUser } from '../../redux/auth/selectors.js';
import UserLogoModal from '../UserLogoModal/UserLogoModal.jsx';
import css from './UserLogo.module.css';
import icons from '../../images/icons/icons.svg';
import SettingModal from '../SettingModal/SettingModal.jsx';
import LogOutModal from '../UserLogoutModal/UserLogoutModal.jsx';
import { resetModalState } from '../../redux/auth/slice.js';
const UserLogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpen = useSelector(selectIsModalOpen);
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const [isModalSettingOpen, setIsModalSettingOpen] = useState(isOpen);
  const dispatch = useDispatch();
  const handleOpenModalLogout = () => setIsModalLogoutOpen(true);
  const handleCloseModalLogout = () => setIsModalLogoutOpen(false);
  const handleOpenModalSetting = () => setIsModalSettingOpen(true);
  const handleCloseModalSetting = () => {
    dispatch(resetModalState());
    setIsModalSettingOpen(false);
  };
  const user = useSelector(selectUser);
  const { email, name } = user;
  const buttonRef = useRef(null);
  let photo;
  if (user.photo) photo = user.photo;

  const getInitials = () => {
    if (name) {
      return name.charAt(0).toUpperCase();
    } else if (email) {
      return email.charAt(0).toUpperCase();
    }
    return '?';
  };

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };
  return (
    <div className={css.userLogo}>
      <span className={css.userLogoName}>{name}</span>
      <button
        className={css.userLogoButton}
        ref={buttonRef}
        onClick={toggleModal}
      >
        {photo ? (
          <img className={css.userLogoAvatar} src={photo} alt={name} />
        ) : (
          <div className={css.userLogoInitial}>{getInitials()}</div>
        )}
        <svg
          className={`${css.userLogoIcon} ${isModalOpen ? css.rotate : ''}`}
          width="16"
          height="16"
        >
          <use href={`${icons}#icon-chevron-double-up`} />
        </svg>
      </button>
      {isModalOpen && (
        <UserLogoModal
          handleOpenModalLogout={handleOpenModalLogout}
          handleOpenModalSetting={handleOpenModalSetting}
          toggleModal={toggleModal}
          buttonRef={buttonRef}
        />
      )}
      {isModalSettingOpen && (
        <SettingModal
          isOpen={isModalSettingOpen}
          onClose={handleCloseModalSetting}
        />
      )}
      {isModalLogoutOpen && <LogOutModal onClose={handleCloseModalLogout} />}
    </div>
  );
};
export default UserLogo;
