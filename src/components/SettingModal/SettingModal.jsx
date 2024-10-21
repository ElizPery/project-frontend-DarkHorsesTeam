import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SettingModal.module.css';
import icons from '../../images/icons/icons.svg';
import * as Yup from 'yup';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SettingModal = ({ isOpen, onClose }) => {
    const [photo, setPhoto] = useState(null);
    const [gender, setGender] = useState('woman');
    const [name, setName] = useState('David');
    const [email, setEmail] = useState('david01@gmail.com');
    const [outdatedPassword, setOutdatedPassword] = useState('Password');
    const [newPassword, setNewPassword] = useState('Password');
    const [repeatPassword, setRepeatPassword] = useState('Password');
    const [visibleOutdatedPassword, setVisibleOutdatedPassword] = useState(false);
    const [visibleNewPassword, setVisibleNewPassword] = useState(false);
    const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    useEffect(() => {
        if (isOpen) {
            fetchUserData();
        }
    }, [isOpen]);
    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://project-backend-darkhorsesteam.onrender.com/user');
            const userData = response.data.data || {};

            // Використовуємо актуальні дані або значення за замовчуванням
            setPhoto(userData.photo || null);
            setGender(userData.gender || 'woman');
            setName(userData.name || 'David');
            setEmail(userData.email || 'david01@gmail.com');
        } catch (error) {
            console.error(error.response?.data || error.message);
            setServerError('Failed to fetch user data. Please try again.');

            // Використовуємо значення за замовчуванням у разі помилки
            setName('David');
            setEmail('david01@gmail.com');
        }
    };
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            setPhoto(URL.createObjectURL(file)); // Оновлення попереднього перегляду фото
            try {
                const response = await axios.patch('https://project-backend-darkhorsesteam.onrender.com/user/change-photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // Якщо фото оновлено успішно, оновлюємо локальне фото
                if (response.data.status === 200) {
                    setPhoto(response.data.data.photo);
                }
            } catch (error) {
                console.error(error.response?.data || error.message);
                setServerError('Failed to update photo. Please try again.');
            }
        }
    };
    const validateUserUpdate = async (data) => {
        const schema = Yup.object().shape({
            name: Yup.string().min(3).max(32).optional(),
            email: Yup.string().matches(emailRegexp, 'Incorrect email format'),
            currentPwd: Yup.string().min(8, 'Too short').max(64, 'Too long').required('Old password is required'),
            password: Yup.string().min(8, 'Too short').max(64, 'Too long').optional(),
            gender: Yup.string().oneOf(['man', 'woman']).optional(),
        });
        try {
            await schema.validate(data, { abortEarly: false });
            return {};
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            return validationErrors;
        }
    };
    const handleSave = async () => {
        const userData = {
            name,
            email,
            gender,
            currentPwd: outdatedPassword,
            password: newPassword,
        };
        const validationErrors = await validateUserUpdate(userData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.patch('https://project-backend-darkhorsesteam.onrender.com/user/update-info', userData);
            onClose(); // Закриваємо модальне вікно після успішного сабміту
        } catch (error) {
            console.error(error.response?.data || error.message);
            if (error.response) {
                setServerError(error.response.data.message || 'Failed to update user data.');
            }
        }
    };
    if (!isOpen) return null;

return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Settings</h1>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg className={styles.icon_close} width={24} height={24}>
                            <use href={`${icons}#close`} />
                        </svg>
                    </button>
                </div>
                {serverError && <p className={styles.error}>{serverError}</p>}
                <div className={styles.photoSection}>
                    <h2 className={styles.subtitle}>Your photo</h2>
                    <div className={styles.photoContainer}>
                        {photo ? (
                            <img src={photo} alt="User" className={styles.photo} />
                        ) : (
                            <div className={styles.placeholder}>{name.charAt(0) || email.charAt(0)}</div>
                        )}
                        <input
                            type="file"
                            id="photoInput"
                            className={styles.hiddenInput}
                            onChange={handlePhotoChange}
                        />
                        <label htmlFor="photoInput" className={styles.uploadLabel}>
                            <svg className={styles.icon_upload} width={24} height={24}>
                                <use href={`${icons}#icon-arrow-up-tray`} />
                            </svg>
                            Upload a photo
                        </label>
                    </div>
                </div>
                <div className={styles.inputSectionBlock}>
                    <div className={styles.genderNameSectionBlock}>
                        <div className={styles.genderSection}>
                            <h2 className={styles.subtitle}>Your gender identity</h2>
                            <div className={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="woman"
                                        checked={gender === 'woman'}
                                        onChange={() => setGender('woman')}
                                        className={styles.radioGroupItem}
                                    />
                                    Woman
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="man"
                                        checked={gender === 'man'}
                                        onChange={() => setGender('man')}
                                        className={styles.radioGroupItem}
                                    />
                                    Man
                                </label>
                            </div>
                            {errors.gender && <p className={styles.error}>{errors.gender}</p>}
                        </div>
                        <div className={styles.inputSection}>
                            <label className={styles.subtitle}>
                                Your name
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={errors.name ? styles.errorInput : ''}
                                />
                                {errors.name && <p className={styles.error}>{errors.name}</p>}
                            </label>
                            <label className={styles.subtitle}>
                                E-mail
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={errors.email ? styles.errorInput : ''}
                                />
                                {errors.email && <p className={styles.error}>{errors.email}</p>}
                            </label>
                        </div>
                    </div>
                    <div className={styles.passwordSection}>
                        <h2 className={styles.subtitle}>Password</h2>
                        <label className={styles.icon_label}>
                            Outdated password
                            <input
                                type={visibleOutdatedPassword ? 'text' : 'password'}
                                value={outdatedPassword}
                                onChange={(e) => setOutdatedPassword(e.target.value)}
                                className={errors.outdatedPassword ? styles.errorInput : ''}
                            />
                            {errors.outdatedPassword && <p className={styles.error}>{errors.outdatedPassword}</p>}
                            <svg
                                className={styles.icon_eye}
                                width={16}
                                height={16}
                                onClick={() => setVisibleOutdatedPassword(!visibleOutdatedPassword)}
                            >
                                <use href={`${icons}#${visibleOutdatedPassword ? 'icon-eye' : 'icon-eye-slash'}`} />
                            </svg>
                        </label>
                        <label className={styles.icon_label}>
                            New password
                            <input
                                type={visibleNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <svg
                                className={styles.icon_eye}
                                width={16}
                                height={16}
                                onClick={() => setVisibleNewPassword(!visibleNewPassword)}
                            >
                                <use href={`${icons}#${visibleNewPassword ? 'icon-eye' : 'icon-eye-slash'}`} />
                            </svg>
                        </label>
                        <label className={styles.icon_label}>
                            Repeat new password
                            <input
                                type={visibleRepeatPassword ? 'text' : 'password'}
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <svg
                                className={styles.icon_eye}
                                width={16}
                                height={16}
                                onClick={() => setVisibleRepeatPassword(!visibleRepeatPassword)}
                            >
                                <use href={`${icons}#${visibleRepeatPassword ? 'icon-eye' : 'icon-eye-slash'}`} />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className={styles.saveButtonContainer}>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SettingModal;