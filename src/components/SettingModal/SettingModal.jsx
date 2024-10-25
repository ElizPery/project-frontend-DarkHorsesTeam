import { useState } from 'react';
//import axios from 'axios';
import styles from './SettingModal.module.css';
import icons from '../../images/icons/icons.svg';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserInfo, changeUserPhoto } from '../../redux/auth/operations';
import {
  selectUser,
  selectError,
  selectIsLoading,
} from '../../redux/auth/selectors';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SettingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch(); // Використовуємо хук для доступу до dispatch
  const user = useSelector(selectUser); // Отримуємо користувача з Redux
  const error = useSelector(selectError); // Отримуємо помилки з Redux
  const isLoading = useSelector(selectIsLoading); // Статус оновлення

  const [photo, setPhoto] = useState(user.photo);

  const [gender, setGender] = useState(user.gender || 'woman');
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  const [outdatedPassword, setOutdatedPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [visibleOutdatedPassword, setVisibleOutdatedPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

  const [errors, setErrors] = useState({}); // Об'єкт помилок
  // useEffect(() => {
  //     if (isOpen) {
  //         dispatch(fetchUser()); // Отримуємо дані користувача при відкритті модального вікна
  //     }
  // }, [isOpen, dispatch]);
  // useEffect(() => {
  //     setPhoto(user.photo); // Оновлюємо фото, якщо дані користувача змінюються
  //     setGender(user.gender || 'woman');
  //     setName(user.name || 'David');
  //     setEmail(user.email || 'david01@gmail.com');
  // }, [user]);

  const handlePhotoChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      setPhoto(URL.createObjectURL(file)); // Оновлення попереднього перегляду фото
      dispatch(changeUserPhoto(formData)); // Використовуємо Redux для зміни фото
    }
  };

  const validateUserUpdate = async data => {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).max(32).optional(),
      email: Yup.string().matches(emailRegexp, 'Incorrect email format'),
      currentPwd: Yup.string()
        .min(8, 'Too short')
        .max(64, 'Too long')
        .optional('Old password is required'),
      password: Yup.string().min(8, 'Too short').max(64, 'Too long').optional(),
      gender: Yup.string().oneOf(['man', 'woman']).optional(),
    });

    try {
      await schema.validate(data, { abortEarly: false });
      return {};
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
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
    dispatch(updateUserInfo(userData)); // Використовуємо Redux для оновлення інформації про користувача
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <button className={styles.closeButton} onClick={onClose}>
            <svg className={styles.icon_close} width={24} height={24}>
              <use href={`${icons}#close`} />
            </svg>
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}{' '}
        {/* Відображення помилки */}
        <div className={styles.photoSection}>
          <h2 className={styles.subtitle}>Your photo</h2>
          <div className={styles.photoContainer}>
            {photo ? (
              <img src={photo} alt="User" className={styles.photo} />
            ) : (
              <div className={styles.placeholder}>
                {name.charAt(0) || email.charAt(0)}
              </div>
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
                  onChange={e => setName(e.target.value)}
                  className={errors.name ? styles.errorInput : ''}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </label>

              <label className={styles.subtitle}>
                E-mail
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                onChange={e => setOutdatedPassword(e.target.value)}
                className={errors.outdatedPassword ? styles.errorInput : ''}
              />
              {errors.outdatedPassword && (
                <p className={styles.error}>{errors.outdatedPassword}</p>
              )}
              <svg
                className={styles.icon_eye}
                width={16}
                height={16}
                onClick={() =>
                  setVisibleOutdatedPassword(!visibleOutdatedPassword)
                }
              >
                <use
                  href={`${icons}#${
                    visibleOutdatedPassword ? 'icon-eye' : 'icon-eye-slash'
                  }`}
                />
              </svg>
            </label>
            <label className={styles.icon_label}>
              New password
              <input
                type={visibleNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <svg
                className={styles.icon_eye}
                width={16}
                height={16}
                onClick={() => setVisibleNewPassword(!visibleNewPassword)}
              >
                <use
                  href={`${icons}#${
                    visibleNewPassword ? 'icon-eye' : 'icon-eye-slash'
                  }`}
                />
              </svg>
            </label>
            <label className={styles.icon_label}>
              Repeat new password
              <input
                type={visibleRepeatPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
              />
              <svg
                className={styles.icon_eye}
                width={16}
                height={16}
                onClick={() => setVisibleRepeatPassword(!visibleRepeatPassword)}
              >
                <use
                  href={`${icons}#${
                    visibleRepeatPassword ? 'icon-eye' : 'icon-eye-slash'
                  }`}
                />
              </svg>
            </label>
          </div>
        </div>
        <div className={styles.saveButtonContainer}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
