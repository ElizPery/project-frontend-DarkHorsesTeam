import { useSelector } from 'react-redux';
import UserLogo from '../UserLogo/UserLogo.jsx';
import Logo from '../Logo/Logo.jsx';
import Loader from '../Loader/Loader.jsx';
import {
  selectIsLoggedIn,
  selectIsLoading,
  selectIsRefreshing,
} from '../../redux/auth/selectors.js';
import css from './Header.module.css';
import UserAuth from '../UserAuth/UserAuth.jsx';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isLoading || isRefreshing) {
    return (
      <header className={css.header}>
        <Logo />
        <Loader />
      </header>
    );
  }

  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <nav className={css.headerNav}>
          {isLoggedIn ? <UserLogo /> : <UserAuth />}
        </nav>
      </header>
    </div>
  );
};
export default Header;
