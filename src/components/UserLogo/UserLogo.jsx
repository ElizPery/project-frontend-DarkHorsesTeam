import { useState} from 'react';
import { useSelector } from 'react-redux';
import { selectIsModalOpen, selectUser } from '../../redux/auth/selectors.js';
import UserLogoModal from '../UserLogoModal/UserLogoModal.jsx';
import css from './UserLogo.module.css';
import icons from '../../images/icons/icons.svg';
const UserLogo = () => {
  const isOpen = useSelector(selectIsModalOpen);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const user = useSelector(selectUser);
  const { email, name } = user;

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
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={css.userLogo}>
      <span className={css.userLogoName}>{name}</span>
      <button className={css.userLogoButton} onClick={toggleModal}>
        {photo ? (
          <img className={css.userLogoAvatar} src={photo} alt={name} />
        ) : (
          <div className={css.userLogoInitial}>{getInitials()}</div>
        )}
        <svg className={`${css.userLogoIcon} ${isModalOpen ? css.rotate : ''}`} width="16" height="16">
          <use href={`${icons}#icon-chevron-double-up`} />
        </svg>
      </button>
      {isModalOpen && <UserLogoModal />}
    </div>
  );
};
export default UserLogo;
