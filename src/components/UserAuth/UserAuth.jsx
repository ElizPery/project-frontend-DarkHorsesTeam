import { useNavigate } from 'react-router-dom';
import css from './UserAuth.module.css';
import icons from '../../images/icons/icons.svg';

export default function UserAuth() {
  const navigate = useNavigate();
  const handleSigninClick = () => {
    navigate('/signin');
  };

  return (
    <button onClick={handleSigninClick}>
      <div className={css.buttWrap}>
        <div className={css.text}>Sing in</div>
        <div className={css.iconWrap}>
          <svg>
            <use href={`${icons}#icon-user-outline`}></use>
          </svg>
        </div>
      </div>
    </button>
  );
}
