import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import css from './Logo.module.css';
import icons from '../../images/icons/icons.svg';

export default function Logo() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  function handleClick() {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/welcome');
    }
  }

  return (
    <button onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={css.iconWrap}>
        <svg>
          <use href={`${icons}#icon-Logo`}></use>
        </svg>
      </div>
    </button>
  );
}
