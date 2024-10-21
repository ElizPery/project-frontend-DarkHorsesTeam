import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import icons from '../../images/icons/icons.svg';
import styles from './AuthForm.module.css';
import { logIn } from '../../redux/auth/operations.js';

export default function AuthForm() {
  const [visiblePass, setVisiblePass] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [maskedValue, setMaskedValue] = useState('');
  const dispatch = useDispatch();
  const fieldId = { email: useId(), password: useId() };
  const togglePasswordVisibility = () =>
    setVisiblePass(prevState => !prevState);

  const userSchema = Yup.object().shape({
    email: Yup.string().email('Incorrect email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Too short')
      .max(64, 'Too long')
      .required('Password is required'),
  });

  const handleSubmit = (values, actions) => {
    try {
      let userData;

      if (submitButtonLabel === 'Sign up') {
        const name = values.email.split('@')[0];
        userData = {
          email: values.email,
          password: values.password,
          name,
        };

        await onSubmit(userData);
        navigate('/signin');
      } else {
        userData = {
          email: values.email,
          password: values.password,
        };

        await onSubmit(userData);
        navigate('/home');
      }
      resetForm();
    } catch (error) {
      console.log(error);
    }
    setInputValue('');
    setMaskedValue('');
    actions.resetForm();
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
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
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
                  id={fieldId}
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
                <svg
                  className={`${styles.pwd_btn_icon} ${
                    touched.password && errors.password ? styles.error : ''
                  }`}
                >
                  <use href={`${icons}#icon-eye`}></use>
                </svg>
              ) : (
                <svg
                  className={`${styles.pwd_btn_icon} ${
                    touched.password && errors.password ? styles.error : ''
                  }`}
                >
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

          <button className={styles.btn} type="submit">
            Sign in
          </button>
          <Link className={styles.link} to="/signup">
            Sign up
          </Link>
        </Form>
      )}
    </Formik>
  );
}
