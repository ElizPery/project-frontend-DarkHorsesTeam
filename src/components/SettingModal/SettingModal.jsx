import { useState, useEffect } from 'react';
import styles from './SettingModal.module.css';
// import axios from 'axios'; 
import icons from '../../images/icons/icons.svg';


const SettingModal = ({ isOpen, onClose }) => {
    const [photo, setPhoto] = useState(null);
    const [gender, setGender] = useState('Woman');
    const [name, setName] = useState('David');
    const [email, setEmail] = useState('david01@gmail.com');

   const [outdatedPassword, setOutdatedPassword] = useState('Password');
    const [newPassword, setNewPassword] = useState('Password');
    const [repeatPassword, setRepeatPassword] = useState('Password');

    const [visibleOutdatedPassword, setVisibleOutdatedPassword] = useState(false);
    const [visibleNewPassword, setVisibleNewPassword] = useState(false);
    const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
      // Запит на бекенд для отримання info користувача
      // axios.get('/user').then(response => {
      //   const { photo, gender, name, email } = response.data;
      //   setPhoto(photo);
      //   setGender(gender);
      //   setName(name);
     //    setEmail(email);
     //  });

      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);


    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPhoto(URL.createObjectURL(file));
        // Відправка фото на бекенд
       //  const formData = new FormData();
       //  formData.append('photo', file);
      //   axios.patch('/user/change-photo', formData);
      }
    };


    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => password.length >= 8 && password.length <= 64;
    const validateName = (name) => name.length <= 32;
    const handleSave = () => {
      const newErrors = {};
      if (!validateEmail(email)) newErrors.email = 'Invalid email';
      if (!validatePassword(newPassword)) newErrors.password = 'Password must be between 8 and 64 characters';
      if (!validateName(name)) newErrors.name = 'Name must be at most 32 characters';
      if (!gender) newErrors.gender = 'Gender must be selected';
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        // Запит на бекенд для оновлення інформації
        // axios.patch('/user/update-info', { gender, name, email, newPassword })
        //   .then(() => {
        //     onClose();
        //   })
        //   .catch(error => {
        //     setErrors({ ...errors, server: error.message });
        //   });
        onClose(); 
      }
    };

    if (!isOpen) return null; 


  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        

        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <button className={styles.closeButton} onClick={onClose}>
          <svg
          className={styles.icon_close}
          width={24}
          height={24}
          onClick={(onClose)}
        >
          <use
            href={`${icons}#${
             'close'
            }`}
          />
        </svg>
          </button>
        </div>


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
            <svg
          className={styles.icon_upload}
          width={24}
          height={24}
          onClick={(onClose)}
        >
          <use
            href={`${icons}#${
             'icon-arrow-up-tray'
            }`}
          />
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
                value="Woman"
                checked={gender === 'Woman'}
                onChange={() => setGender('Woman')}
                className={styles.radioGroupItem}
              />
              Woman
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Man"
                checked={gender === 'Man'}
                onChange={() => setGender('Man')}
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
        />
        <svg
          className={styles.icon_eye}
          width={16}
          height={16}
          onClick={() => setVisibleOutdatedPassword(!visibleOutdatedPassword)}
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
          onChange={(e) => setNewPassword(e.target.value)}
          className={errors.password ? styles.errorInput : ''}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
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
      <label  className={styles.icon_label}>
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
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        </div>
      </div>
    </div>
  );
};
export default SettingModal;