import css from './UserLogoModal.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';
import { useState } from 'react';
import LogOutModal from '../UserLogoutModal/UserLogoutModal';

const UserLogoModal = () => {
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);

  const handleOpenModalLogout = () => setIsModalLogoutOpen(true);
  const handleCloseModalLogout = () => setIsModalLogoutOpen(false);

  return (
    <div className={css.userMenu}>
      <button className={css.menuItem1}>
        <IoSettingsOutline className={css.icon} />
        <span className={css.text}>Setting</span>
      </button>
      <button onClick={handleOpenModalLogout} className={css.menuItem2}>
        <IoLogOutOutline className={css.icon} />
        <span className={css.text}>Log out</span>
      </button>
      {isModalLogoutOpen && <LogOutModal onClose={handleCloseModalLogout} />}
    </div>
  );
};

export default UserLogoModal;
