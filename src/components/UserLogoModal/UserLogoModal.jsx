import css from './UserLogoModal.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';

const UserLogoModal = () => {
  return (
    <div className={css.userMenu}>
      <div className={css.menuItem1}>
        <IoSettingsOutline className={css.icon} />
        <span className={css.text}>Setting</span>
      </div>
      <div className={css.menuItem2}>
        <IoLogOutOutline className={css.icon} />
        <span className={css.text}>Log out</span>
      </div>
    </div>
  );
};

export default UserLogoModal;
