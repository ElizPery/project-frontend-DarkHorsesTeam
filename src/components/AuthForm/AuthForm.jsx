import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useId, useState } from 'react';
import icons from '../../images/icons/icons.svg';
import styles from './AuthForm.module.css';

export default function AuthForm({ onSubmit, submitButtonLabel = 'Sign in' }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [maskedValue, setMaskedValue] = useState('');
  const [visiblePass, setVisiblePass] = useState(false);
  const [inputRepeatValue, setInputRepeatValue] = useState('');
  const [maskedRepeatValue, setMaskedRepeatValue] = useState('');
  const [visibleRepeatPass, setVisibleRepeatPass] = useState(false);
  const fieldId = {
    email: useId(),
    password: useId(),
    repeatPassword: useId(),
  };
  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setVisiblePass(prevVisiblePass => !prevVisiblePass);
  };

  const toggleRepeatPasswordVisibility = () => {
    setVisibleRepeatPass(prevVisibleRepeatPass => !prevVisibleRepeatPass);
  };

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegexp, 'Incorrect email format')
      .required('Email is required'),
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
    setErrorMessage('');
    try {
      let userData;

      if (submitButtonLabel === 'Sign up') {
        const name = values.email.split('@')[0];
        userData = {
          email: values.email,
          password: values.password,
          name,
        };
        const result = await onSubmit(userData);
        if (result?.error) {
          setErrorMessage(result.error);
        } else {
          resetForm();
          navigate('/signin');
        }
      } else {
        userData = {
          email: values.email,
          password: values.password,
        };
        const result = await onSubmit(userData);
        if (result?.error) {
          setErrorMessage(result.error);
        } else {
          resetForm();
          navigate('/home');
        }
      }
    } catch {
      setErrorMessage('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };
  const handleInputChange = (e, setFieldValue) => {
    const { value } = e.target;
    const inputType = e.nativeEvent.inputType;

    if (inputType === 'deleteContentBackward') {
      const updatedValue = inputValue.slice(0, -1);
      setInputValue(updatedValue);
      setMaskedValue('*'.repeat(updatedValue.length));
      setFieldValue('password', updatedValue);
    } else {
      const updatedValue = inputValue + value.slice(-1);
      setInputValue(updatedValue);
      setMaskedValue('*'.repeat(updatedValue.length));
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
                    type="text"
                    {...field}
                    className={`${styles.field_pwd} ${
                      touched.password && errors.password ? styles.error : ''
                    }`}
                    id={fieldId.password}
                    placeholder="Password"
                    value={visiblePass ? inputValue : maskedValue}
                    onChange={e => handleInputChange(e, form.setFieldValue)}
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
                    <use href={`${icons}#icon-eye`}></use>{' '}
                  </svg>
                ) : (
                  <svg className={styles.pwd_btn_icon}>
                    <use href={`${icons}#icon-eye-slash`}></use>{' '}
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
                      type="text"
                      {...field}
                      className={`${styles.field_pwd} ${
                        touched.repeatPassword && errors.repeatPassword
                          ? styles.error
                          : ''
                      }`}
                      id={fieldId.repeatPassword}
                      placeholder="Repeat password"
                      value={
                        visibleRepeatPass ? inputRepeatValue : maskedRepeatValue
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
                  title={visibleRepeatPass ? 'Hide password' : 'Show password'}
                >
                  {visibleRepeatPass ? (
                    <svg className={styles.pwd_btn_icon}>
                      <use href={`${icons}#icon-eye`}></use>{' '}
                    </svg>
                  ) : (
                    <svg className={styles.pwd_btn_icon}>
                      <use href={`${icons}#icon-eye-slash`}></use>{' '}
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
