import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast, Toaster } from 'react-hot-toast';

import styles from './SettingModal.module.css';
import icons from '../../images/icons/icons.svg';

import { updateUserInfo, changeUserPhoto } from '../../redux/auth/operations';
import { selectUser, selectError, selectIsUpdatingInfo, selectIsChangingPhoto } from '../../redux/auth/selectors';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SettingModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const error = useSelector(selectError);
    const isUpdating = useSelector(selectIsUpdatingInfo);
    const isChangingPhoto = useSelector(selectIsChangingPhoto);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const initialValues = {
        name: user?.name || 'David',
        email: user?.email || 'david01@gmail.com',
        gender: user?.gender || 'woman',
        currentPwd: 'Password',
        password: 'Password',
        repeatPassword: 'Password',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters long')
            .max(32, 'Name must be at most 32 characters long')
            .optional(),
        email: Yup.string()
            .matches(emailRegexp, 'Incorrect email format')
            .optional(),
        currentPwd: Yup.string()
            .min(8, 'Current password must be at least 8 characters long')
            .max(64, 'Current password must be at most 64 characters long'),
        password: Yup.string()
            .min(8, 'New password must be at least 8 characters long')
            .max(64, 'New password must be at most 64 characters long')
            .optional(),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') 
            .optional(),
    });
    
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            try {
                await dispatch(changeUserPhoto(formData));
                toast.success('Photo uploaded successfully!');
            } catch (err) {
                toast.error('Error uploading photo!');
            }
        }
    };


    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
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
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Settings</h1>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg className={styles.icon_close} width={24} height={24}>
                            <use href={`${icons}#close`} />
                        </svg>
                    </button>
                </div>
                {error && toast.error(error)}
                <div className={styles.photoSection}>
                    <h2 className={styles.subtitle}>Your photo</h2>
                    <div className={styles.photoContainer}>
                        {user?.photo ? (
                            <img src={user.photo} alt="User" className={styles.photo} />
                        ) : (
                            <div className={styles.placeholder}>
                                {getInitials()}
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
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        dispatch(updateUserInfo(values));
                        onClose();
                    }}
                >
                    {({ values, errors, touched }) => (

<Form>
                            <div className={styles.inputContainer}>
                                <div className={styles.genderNameSectionBlock}>
                                    <div className={styles.genderSection}>
                                        <h2 className={styles.subtitle}>Your gender identity</h2>
                                        <div className={styles.radioGroupBlock}>
                                            <div className={styles.radioGroup}>
                                                <label>
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="woman"
                                                        className={styles.radioGroupItem}
                                                    />
                                                    Woman
                                                </label>
                                                <label>
                                                    <Field
                                                        type="radio"
                                                        name="gender"
                                                        value="man"
                                                        className={styles.radioGroupItem}
                                                    />
                                                    Man
                                                </label>
                                            </div>
                                            <ErrorMessage name="gender" component="p" className={styles.error} />
                                        </div>
                                        <div className={styles.inputSection}>
                                            <label className={styles.subtitle}>
                                                Your name
                                                <Field name="name">
                                                    {({ field }) => (
                                                        <input
                                                            type="text"
                                                            {...field}
                                                            className={errors.name && touched.name ? styles.errorInput : ''}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="name" component="p" className={`${styles.error}`} />
                                            </label>
                                            <label className={styles.subtitle}>
                                                E-mail
                                                <Field name="email">
                                                    {({ field }) => (
                                                        <input
                                                            type="email"
                                                            {...field}
                                                            className={errors.email && touched.email ? styles.errorInput : ''}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name="email" component="p" className={`${styles.error}`} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.passwordSection}>
                                    <h2 className={styles.subtitle}>Password</h2>
                                    <label className={styles.icon_label}>
                                        Current password
                                        <Field name="currentPwd">
                                            {({ field }) => (
                                                <input
                                                    type={showCurrentPassword ? 'text' : 'password'}
                                                    {...field}
                                                    className={errors.currentPwd && touched.currentPwd ? styles.errorInput : ''}
                                                />
                                            )}
                                        </Field>
                                        <svg
                                            className={styles.icon_eye}
                                            width={16}
                                            height={16}
                                            onClick={toggleShowCurrentPassword}
                                        >
                                            <use href={`${icons}#${showCurrentPassword ? 'icon-eye' : 'icon-eye-slash'}`} />
                                        </svg>
                                        <ErrorMessage name="currentPwd" component="p" className={`${styles.error}`} />
                                        <span className={styles.passwordMask}>
                                            {showCurrentPassword ? '' : '*'.repeat(values.currentPwd.length)}
                                        </span>
                                    </label>
                                    <label className={styles.icon_label}>
                                        New password
                                        <Field name="password">
                                            {({ field }) => (
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    {...field}
                                                    className={errors.password && touched.password ? styles.errorInput : ''}
                                                />
                                            )}
                                        </Field>
                                        <svg
                                            className={styles.icon_eye}
                                            width={16}
                                            height={16}
                                            onClick={toggleShowNewPassword}
                                        >
                                            <use href={`${icons}#${showNewPassword ? 'icon-eye' : 'icon-eye-slash'}`} />
                                        </svg>
                                        <ErrorMessage name="password" component="p" className={`${styles.error}`} />
                                        <span className={styles.passwordMask}>
                                            {showNewPassword ? '' : '*'.repeat(values.password.length)}
                                        </span>
                                    </label>
                                    <label className={styles.icon_label}>
                                        Repeat new password
                                        <Field name="repeatPassword">
                                            {({ field }) => (
                                                <input
                                                    type={showRepeatPassword ? 'text' : 'password'}
                                                    {...field}
                                                    className={errors.repeatPassword && touched.repeatPassword ? styles.errorInput : ''}
                                                />
                                            )}
                                        </Field>
                                        <svg
                                            className={styles.icon_eye}
                                            width={16}
                                            height={16}
                                            onClick={toggleShowRepeatPassword}
                                        >
                                            <use href={`${icons}#${showRepeatPassword ? 'icon-eye' : 'icon-eye-slash'}`} />
                                        </svg>
                                        <ErrorMessage name="repeatPassword" component="p" className={`${styles.error}`} />
                                        <span className={styles.passwordMask } >
                                            
                                            {showRepeatPassword ? '' : '*'.repeat(values.repeatPassword.length)}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.saveButtonContainer}>
                                <button className={styles.saveButton} type="submit" disabled={isUpdating || isChangingPhoto}>
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
