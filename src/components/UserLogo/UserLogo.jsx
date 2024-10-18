import { useState } from "react";
import { useSelector } from "react-redux";
//import UserLogoModal from "../UserLogoModal/UserLogoModal.jsx";
import { selectUser } from "../../redux/auth/selectors.js";
import css from "./UserLogo.module.css";
import icons from '../../images/icons/icons.svg';
const UserLogo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector(selectUser);
    // const user = {
    //     name: "David",
    //     email: "david@example.com"
    // };
    const { photo, name, email } = user;

    const getInitials = () => {
        if (name) {
            return name.charAt(0).toUpperCase();
        } else if (email) {
            return '@';
        }
        return '?';
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={css.userLogo}>
            <span className={css.userLogoName}>{name || email}</span>
            <button className={css.userLogoButton} onClick={toggleModal}>
                {photo ? (
                    <img className={css.userLogoAvatar} src={photo} alt={name} />
                ) : (
                    <div className={css.userLogoInitial}>{getInitials()}</div>
                )}
                <svg className={css.userLogoIcon} width="16" height="16">
                    <use href={`${icons}#icon-chevron-double-up`} />
                </svg>
            </button>
            {isModalOpen && <h2>Modal</h2>}
        </div>
    );
};
export default UserLogo;