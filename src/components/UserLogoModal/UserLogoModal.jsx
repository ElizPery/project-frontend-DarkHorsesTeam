import css from './UserLogoModal.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';

const UserLogoModal = ({
  handleOpenModalLogout,
  handleOpenModalSetting,
  toggleModal,
}) => {
  return (
    <div className={css.userMenu}>
      <button
        onClick={() => {
          handleOpenModalSetting();
          toggleModal();
        }}
        className={css.menuItem1}
      >
        <IoSettingsOutline className={css.icon} />
        <span className={css.text}>Setting</span>
      </button>
      <button
        onClick={() => {
          handleOpenModalLogout();
          toggleModal();
        }}
        className={css.menuItem2}
      >
        <IoLogOutOutline className={css.icon} />
        <span className={css.text}>Log out</span>
      </button>
    </div>
  );
};

export default UserLogoModal;
