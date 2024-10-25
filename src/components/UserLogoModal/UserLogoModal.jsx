import css from './UserLogoModal.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';
import { useState } from 'react';
import SettingModal from '../SettingModal/SettingModal.jsx';
import LogOutModal from '../UserLogoutModal/UserLogoutModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsModalOpen } from '../../redux/auth/selectors.js';
import { resetModalState } from '../../redux/auth/slice.js';

const UserLogoModal = () => {
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
  return (
    <div className={css.userMenu}>
      <button onClick={handleOpenModalSetting} className={css.menuItem1}>
        <IoSettingsOutline className={css.icon} />
        <span className={css.text}>Setting</span>
      </button>
      <button onClick={handleOpenModalLogout} className={css.menuItem2}>
        <IoLogOutOutline className={css.icon} />
        <span className={css.text}>Log out</span>
      </button>
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

export default UserLogoModal;
