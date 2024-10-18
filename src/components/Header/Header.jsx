import { useSelector } from "react-redux";
import UserLogo from "../UserLogo/UserLogo.jsx";
//import Logo from "../Logo/Logo.jsx";
import Loader from "../Loader/Loader.jsx";
import { selectIsLoggedIn, selectIsLoading, selectIsRefreshing, selectError } from "../../redux/auth/selectors.js";
import css from "./Header.module.css";

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);
    const isRefreshing = useSelector(selectIsRefreshing);
    const error = useSelector(selectError);

    if (isLoading || isRefreshing) {
        return (
            <header className={css.header}>
                <h3>Logo</h3>
                <Loader />
            </header>
        );
    }
    if (error) {
        return (
            <header className={css.header}>
                <h3>Logo</h3>
                <p>Error: {error}</p>
            </header>
        );
            
    }

    return (
        <header className={css.header}>
            <h3>Logo</h3>
            <nav className={css.headerNav}>
                {isLoggedIn ? (
                    <UserLogo />
                ) : (
                    <ul></ul>
                )}
            </nav>
        </header>
    );
};
export default Header;
