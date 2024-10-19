import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useId, useState } from 'react';
import icons from '../../images/icons/icons.svg';
import styles from './AuthForm.module.css';

export default function AuthForm({ onSubmit, submitButtonLabel = 'Sign in' }) {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRepeatPass, setVisibleRepeatPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fieldId = {
    email: useId(),
    password: useId(),
    repeatPassword: useId(),
  };
  const navigate = useNavigate();

  const togglePasswordVisibility = () =>
    setVisiblePass(prevState => !prevState);
  const toggleRepeatPasswordVisibility = () =>
    setVisibleRepeatPass(prevState => !prevState);

  const userSchema = Yup.object().shape({
    email: Yup.string().email('Incorrect email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Too short')
      .max(64, 'Too long')
      .required('Password is required'),
    repeatPassword:
      submitButtonLabel === 'Sign up'
        ? Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
        : null,
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      let userData;

      if (submitButtonLabel === 'Sign up') {
        const name = values.email.split('@')[0];
        userData = {
          email: values.email,
          password: values.password,
          name,
        };
      } else {
        userData = {
          email: values.email,
          password: values.password,
        };
      }
      await onSubmit(userData);
      resetForm();
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Registration failed';
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className={styles.error_message}>{errorMessage}</div>
      )}
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            {/* Email Field */}
            <label className={styles.label} htmlFor={fieldId.email}>
              Enter your email
              <Field
                className={`${styles.field_email} ${
                  touched.email && errors.email ? styles.error : ''
                }`}
                type="email"
                name="email"
                placeholder="E-mail"
                id={fieldId.email}
              />
              <ErrorMessage
                className={styles.error_message}
                name="email"
                component="span"
              />
            </label>

            {/* Password Field */}
            <label className={styles.label} htmlFor={fieldId.password}>
              Enter your password
              <Field name="password">
                {({ field, form }) => (
                  <input
                    type={visiblePass ? 'text' : 'password'}
                    {...field}
                    className={`${styles.field_pwd} ${
                      touched.password && errors.password ? styles.error : ''
                    }`}
                    id={fieldId.password}
                    placeholder="Password"
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
                name="password"
                component="span"
              />
            </label>

            {/* Repeat Password Field */}
            {submitButtonLabel === 'Sign up' && (
              <label className={styles.label} htmlFor={fieldId.repeatPassword}>
                Repeat password
                <Field name="repeatPassword">
                  {({ field, form }) => (
                    <input
                      type={visibleRepeatPass ? 'text' : 'password'}
                      {...field}
                      className={`${styles.field_pwd} ${
                        touched.repeatPassword && errors.repeatPassword
                          ? styles.error
                          : ''
                      }`}
                      id={fieldId.repeatPassword}
                      placeholder="Repeat password"
                    />
                  )}
                </Field>
                <button
                  className={styles.pwd_btn}
                  type="button"
                  onClick={toggleRepeatPasswordVisibility}
                  title={visibleRepeatPass ? 'Hide password' : 'Show password'}
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
            )}

            {/* Submit Button */}
            <button className={styles.btn} type="submit">
              {submitButtonLabel}
            </button>

            {/* Navigation link changes  login/signup */}
            <Link
              className={styles.link}
              to={submitButtonLabel === 'Sign up' ? '/signin' : '/signup'}
            >
              {submitButtonLabel === 'Sign up' ? 'Sign in' : 'Sign up'}
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}
