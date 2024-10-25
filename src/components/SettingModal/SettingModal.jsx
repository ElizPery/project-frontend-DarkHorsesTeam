import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, Toaster } from 'react-hot-toast';
import styles from './SettingModal.module.css';
import icons from '../../images/icons/icons.svg';
import { updateUserInfo, changeUserPhoto } from '../../redux/auth/operations';
import {
  selectUser,
  selectError,
  selectIsLoading,
} from '../../redux/auth/selectors';
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SettingModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const [photo, setPhoto] = useState(user.photo);

  const [inputValue, setInputValue] = useState('');
  const [maskedValue, setMaskedValue] = useState('');
  const [visiblePass, setVisiblePass] = useState(false);

  const [inputNewValue, setInputNewValue] = useState('');
  const [maskedNewValue, setMaskedNewValue] = useState('');
  const [visibleNewPass, setVisibleNewPass] = useState(false);

  const [inputRepeatValue, setInputRepeatValue] = useState('');
  const [maskedRepeatValue, setMaskedRepeatValue] = useState('');
  const [visibleRepeatPass, setVisibleRepeatPass] = useState(false);

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const initialValues = {
    name: user?.name || 'David',
    email: user?.email || 'david01@gmail.com',
    gender: user?.gender || 'female',
    currentPwd: '',
    password: '',
    repeatPassword: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(32, 'Name must be at most 32 characters long')
      .optional(),

    email: Yup.string()
      .matches(emailRegexp, 'Incorrect email format')
      .optional(),

    currentPwd: Yup.string()
      .min(8, 'Current password must be at least 8 characters long')
      .max(64, 'Current password must be at most 64 characters long')
      .optional(),

    password: Yup.string()
      .min(8, 'New password must be at least 8 characters long')
      .max(64, 'New password must be at most 64 characters long')
      .optional(),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .optional(),
  }).test(
    'password-fields-check',
    'To reset the password, all password fields must be filled out',
    function (values) {
      const { password, currentPwd, repeatPassword } = values;

      // Перевіряємо, якщо одне з полів заповнене, тоді всі мають бути заповнені
      const isAnyPasswordFieldFilled = password || currentPwd || repeatPassword;
      const areAllPasswordFieldsFilled =
        password && currentPwd && repeatPassword;

      if (isAnyPasswordFieldFilled && !areAllPasswordFieldsFilled) {
        return this.createError({
          path: 'currentPwd', // Вибираємо одне з полів для показу помилки
          message:
            'To reset the password, all password fields must be filled out',
        });
      }

      return true;
    }
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const cleanedValues = { ...values };
      delete cleanedValues.repeatPassword;
      if (!cleanedValues.password) delete cleanedValues.password;
      if (!cleanedValues.currentPwd) delete cleanedValues.currentPwd;

      await dispatch(updateUserInfo(cleanedValues));
      if (error) {
        toast.error(`Update user info failed: ${error}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      setPhoto(URL.createObjectURL(file));

      await dispatch(changeUserPhoto(formData));
      toast.success('User photo updated successfully!');

      if (error) {
        toast.error(`Change user photo failed: ${error}`);
      }
    }
  };

  const handleInputChange = (e, setFieldValue) => {
    const { value } = e.target;
    const inputType = e.nativeEvent.inputType;
    if (inputType === 'deleteContentBackward') {
      const updatedValue = inputValue.slice(0, -1);
      setInputValue(updatedValue);
      setMaskedValue('*'.repeat(updatedValue.length));
      setFieldValue('currentPwd', updatedValue);
    } else {
      const updatedValue = inputValue + value.slice(-1);
      setInputValue(updatedValue);
      setMaskedValue('*'.repeat(updatedValue.length));
      setFieldValue('currentPwd', updatedValue);
    }
  };

  const handleNewInputChange = (e, setFieldValue) => {
    const { value } = e.target;
    const inputType = e.nativeEvent.inputType;
    if (inputType === 'deleteContentBackward') {
      const updatedValue = inputNewValue.slice(0, -1);
      setInputNewValue(updatedValue);
      setMaskedNewValue('*'.repeat(updatedValue.length));
      setFieldValue('password', updatedValue);
    } else {
      const updatedValue = inputNewValue + value.slice(-1);
      setInputNewValue(updatedValue);
      setMaskedNewValue('*'.repeat(updatedValue.length));
      setFieldValue('password', updatedValue);
    }
  };

  const handleRepeatInputChange = (e, setFieldValue) => {
    const { value } = e.target;
    const inputType = e.nativeEvent.inputType;
    if (inputType === 'deleteContentBackward') {
      const updatedValue = inputRepeatValue.slice(0, -1);
      setInputRepeatValue(updatedValue);
      setMaskedRepeatValue('*'.repeat(updatedValue.length));
      setFieldValue('repeatPassword', updatedValue);
    } else {
      const updatedValue = inputRepeatValue + value.slice(-1);
      setInputRepeatValue(updatedValue);
      setMaskedRepeatValue('*'.repeat(updatedValue.length));
      setFieldValue('repeatPassword', updatedValue);
    }
  };

  const togglePasswordVisibility = () => {
    setVisiblePass(prev => !prev);
  };
  const toggleNewPasswordVisibility = () => {
    setVisibleNewPass(prev => !prev);
  };
  const toggleRepeatPasswordVisibility = () => {
    setVisibleRepeatPass(prev => !prev);
  };

  const getInitials = () => {
    if (initialValues.name) {
      return initialValues.name.charAt(0).toUpperCase();
    } else if (initialValues.email) {
      return initialValues.email.charAt(0).toUpperCase();
    }
    return '?';
  };
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <button className={styles.close_button} onClick={onClose}>
            <svg className={styles.icon_close} width={24} height={24}>
              <use href={`${icons}#close`} />
            </svg>
          </button>
        </div>
        <div className={styles.photo_section}>
          <h2 className={styles.photo_title}>Your photo</h2>
          <div className={styles.photo_container}>
            {photo ? (
              <img src={photo} alt="User" className={styles.photo} />
            ) : (
              <div className={styles.placeholder}>{getInitials()}</div>
            )}
            <input
              type="file"
              id="photoInput"
              className={styles.hidden_input}
              onChange={handlePhotoChange}
            />
            <label htmlFor="photoInput" className={styles.upload_label}>
              <svg className={styles.icon_upload} width={16} height={16}>
                <use href={`${icons}#icon-arrow-up-tray`} />
              </svg>
              Upload a photo
            </label>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.input_container}>
                <div className={styles.gender_name_section_block}>
                  <div className={styles.gender_section}>
                    <h2 className={styles.gender_title}>
                      Your gender identity
                    </h2>
                    <div className={styles.radio_group_block}>
                      <div className={styles.radio_group}>
                        <label className={styles.radio_group_label}>
                          <Field
                            type="radio"
                            name="gender"
                            value="female"
                            className={styles.radio_group_item}
                          />
                          Woman
                        </label>
                        <label className={styles.radio_group_label}>
                          <Field
                            type="radio"
                            name="gender"
                            value="male"
                            className={styles.radio_group_item}
                          />
                          Man
                        </label>
                      </div>
                      <ErrorMessage
                        name="gender"
                        component="p"
                        className={styles.error}
                      />
                    </div>
                    <div className={styles.input_section}>
                      {/* Name Field */}
                      <label className={styles.label_name} htmlFor="name">
                        Your name
                        <Field
                          className={`${styles.field_name} ${
                            touched.name && errors.name ? styles.error : ''
                          }`}
                          type="text"
                          name="name"
                          placeholder="Name"
                          id="name"
                        />
                        <ErrorMessage
                          className={styles.error_message}
                          name="name"
                          component="span"
                        />
                      </label>
                      {/* Email Field */}
                      <label className={styles.label_email} htmlFor="email">
                        E-mail
                        <Field
                          className={`${styles.field_email} ${
                            touched.email && errors.email ? styles.error : ''
                          }`}
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          id="email"
                        />
                        <ErrorMessage
                          className={styles.error_message}
                          name="email"
                          component="span"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.password_section}>
                  <h2 className={styles.pasword_title}>Password</h2>

                  {/* Current Password Field */}
                  <label className={styles.label} htmlFor="currentPwd">
                    Outdated password:
                    <Field name="currentPwd">
                      {({ field, form }) => (
                        <input
                          type="text"
                          {...field}
                          className={`${styles.field_pwd} ${
                            touched.currentPwd && errors.currentPwd
                              ? styles.error
                              : ''
                          }`}
                          id="currentPwd"
                          placeholder="Current Password"
                          value={visiblePass ? inputValue : maskedValue}
                          onChange={e =>
                            handleInputChange(e, form.setFieldValue)
                          }
                        />
                      )}
                    </Field>
                    <button
                      className={styles.pwd_btn}
                      type="button"
                      onClick={togglePasswordVisibility}
                      title={visiblePass ? 'Hide password' : 'Show password'}
                    >
                      {visiblePass ? (
                        <svg className={styles.pwd_btn_icon}>
                          <use href={`${icons}#icon-eye`}></use>
                        </svg>
                      ) : (
                        <svg className={styles.pwd_btn_icon}>
                          <use href={`${icons}#icon-eye-slash`}></use>
                        </svg>
                      )}
                    </button>
                    <ErrorMessage
                      className={styles.error_message}
                      name="currentPwd"
                      component="span"
                    />
                  </label>

                  {/* New Password Field */}
                  <label className={styles.label} htmlFor="password">
                    New password
                    <Field name="password">
                      {({ field, form }) => (
                        <input
                          type="text"
                          {...field}
                          className={`${styles.field_pwd} ${
                            touched.password && errors.password
                              ? styles.error
                              : ''
                          }`}
                          id="password"
                          placeholder="New Password"
                          value={
                            visibleNewPass ? inputNewValue : maskedNewValue
                          }
                          onChange={e =>
                            handleNewInputChange(e, form.setFieldValue)
                          }
                        />
                      )}
                    </Field>
                    <button
                      className={styles.pwd_btn}
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      title={visibleNewPass ? 'Hide password' : 'Show password'}
                    >
                      {visibleNewPass ? (
                        <svg className={styles.pwd_btn_icon}>
                          <use href={`${icons}#icon-eye`}></use>
                        </svg>
                      ) : (
                        <svg className={styles.pwd_btn_icon}>
                          <use href={`${icons}#icon-eye-slash`}></use>
                        </svg>
                      )}
                    </button>
                    <ErrorMessage
                      className={styles.error_message}
                      name="password"
                      component="span"
                    />
                  </label>

                  {/* Repeat Password Field */}
                  <label className={styles.label} htmlFor="repeatPassword">
                    Repeat new password:
                    <Field name="repeatPassword">
                      {({ field, form }) => (
                        <input
                          type="text"
                          {...field}
                          className={`${styles.field_pwd} ${
                            touched.repeatPassword && errors.repeatPassword
                              ? styles.error
                              : ''
                          }`}
                          id="repeatPassword"
                          placeholder="Repeat Password"
                          value={
                            visibleRepeatPass
                              ? inputRepeatValue
                              : maskedRepeatValue
                          }
                          onChange={e =>
                            handleRepeatInputChange(e, form.setFieldValue)
                          }
                        />
                      )}
                    </Field>
                    <button
                      className={styles.pwd_btn}
                      type="button"
                      onClick={toggleRepeatPasswordVisibility}
                      title={
                        visibleRepeatPass ? 'Hide password' : 'Show password'
                      }
                    >
                      {visibleRepeatPass ? (
                        <svg className={styles.pwd_btn_icon}>
                          <use href={`${icons}#icon-eye`}></use>
                        </svg>
                      ) : (
                        <svg className={styles.pwd_btn_icon}>
                          <use href={`${icons}#icon-eye-slash`}></use>
                        </svg>
                      )}
                    </button>
                    <ErrorMessage
                      className={styles.error_message}
                      name="repeatPassword"
                      component="span"
                    />
                  </label>
                </div>
              </div>
              <div className={styles.save_button_container}>
                <button
                  className={styles.save_button}
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Toaster />
      </div>
    </div>
  );
};
export default SettingModal;
