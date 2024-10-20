import { useSelector } from "react-redux";
import UserLogo from "../UserLogo/UserLogo.jsx";
import Logo from "../Logo/Logo.jsx";
import Loader from "../Loader/Loader.jsx";
import { selectIsLoggedIn, selectIsLoading, selectIsRefreshing, selectError } from "../../redux/auth/selectors.js";
import css from "./Header.module.css";
import UserAuth from "../UserAuth/UserAuth.jsx";

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const isRefreshing = useSelector(selectIsRefreshing);
    const error = useSelector(selectError);

    if (isLoading || isRefreshing) {
        return (
            <header className={css.header}>
                <Logo />
                <Loader />
            </header>
        );
    }
    if (error) {
        return (
            <header className={css.header}>
                <Logo />
                <p>Error: {error}</p>
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
