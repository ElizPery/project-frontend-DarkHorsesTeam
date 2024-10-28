import { useEffect, useRef } from 'react';
import css from './UserLogoModal.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';

const UserLogoModal = ({
  handleOpenModalLogout,
  handleOpenModalSetting,
  toggleModal,
  buttonRef,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        toggleModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleModal, buttonRef]);

  return (
    <div ref={modalRef} className={css.userMenu}>
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
