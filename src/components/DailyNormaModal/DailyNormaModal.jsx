import React, { useState, useEffect } from 'react';
import styles from './DailyNormaModal.module.css';
import icons from '../../images/icons/icons.svg';
import { useDispatch } from 'react-redux';
import { updateDailyWaterRate } from '../../redux/auth/operations';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  weight: Yup.number()
    .required('Weight is required')
    .min(1, 'Weight must be greater than 0')
    .max(300, 'Weight must be less than 300'),
  activityTime: Yup.number()
    .required('Activity time is required')
    .min(0, 'Activity time must be 0 or more')
    .max(24, 'Activity time must be less than 24 hours'),
});

const DailyNormaModal = () => {
  const [gender, setGender] = useState('woman');
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [waterNorm, setWaterNorm] = useState(0);
  const [plannedWater, setPlannedWater] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const calculateWaterNorm = () => {
    let norm = 0;
    if (gender === 'woman') {
      norm = weight * 0.03 + activityTime * 0.4;
    } else {
      norm = weight * 0.04 + activityTime * 0.6;
    }
    setWaterNorm(norm.toFixed(1));
  };

  useEffect(() => {
    calculateWaterNorm();
  }, [weight, activityTime, gender]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('modalClosed', 'true');
  };

  useEffect(() => {
    const modalClosed = localStorage.getItem('modalClosed');
    if (modalClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const validateForm = async () => {
    try {
      setErrors({});

      await validationSchema.validate(
        { weight, activityTime },
        { abortEarly: false }
      );
      return true;
    } catch (validationErrors) {
      const errorObj = {};
      validationErrors.inner.forEach(error => {
        errorObj[error.path] = error.message;
      });
      setErrors(errorObj);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();

    const validatedActivityTime = activityTime ? parseFloat(activityTime) : 0;

    if (isValid) {
      dispatch(updateDailyWaterRate(waterNorm));
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>My daily norma</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <svg className={styles.icon_close} width={24} height={24}>
              <use href={`${icons}#close`} />
            </svg>
          </button>
        </div>
        <div className={styles.formula}>
          <p className={`${styles.common_text} ${styles.text_for_girl}`}>
            For girl:
            <span className={styles.blue_text}> V=(M*0,03) + (T*0,4)</span>
          </p>
          <p className={`${styles.common_text} ${styles.text_for_man}`}>
            For man:
            <span className={styles.blue_text}> V=(M*0,04) + (T*0,6)</span>
          </p>
        </div>
        <p className={styles.description}>
          <span className={styles.blue_text}>*</span> V is the volume of the
          water norm in liters per day, M is your body weight, T is the time of
          active sports, or another type of activity commensurate in terms of
          loads (in the absence of these, you must set 0)
        </p>
        <h3 className={styles.subtitle}>Calculate your rate:</h3>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="woman"
              checked={gender === 'woman'}
              onChange={() => setGender('woman')}
            />
            <span className={styles.radiotext}>For woman</span>
          </label>
          <label>
            <input
              className={styles.radio_button}
              type="radio"
              value="man"
              checked={gender === 'man'}
              onChange={() => setGender('man')}
            />
            <span className={styles.radiotext}>For man</span>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={`${styles.common_text} ${styles.text_input}`}>
            Your weight in kilograms:
          </label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            min="0"
          />
          {errors.weight && <div className={styles.error}>{errors.weight}</div>}
        </div>
        {/* wfwfwfe */}
        <div className={styles.formGroup}>
          <label className={`${styles.common_text} ${styles.text_input}`}>
            The time of active participation in sports or other activities with
            a high physical. load in hours:
          </label>
          <input
            type="number"
            value={activityTime}
            onChange={e => setActivityTime(e.target.value)}
            min="0"
          />
          {errors.activityTime && (
            <div className={styles.error}>{errors.activityTime}</div>
          )}
        </div>
        <div className={styles.another}>
          <p className={`${styles.common_text} ${styles.text_waterNorm}`}>
            The required amount of water in liters per day:
          </p>
          <p className={styles.waterNorm}>{waterNorm} L</p>
        </div>
        <div className={styles.formGroup}>
          <p className={styles.downtext}>
            Write down how much water you will drink:
          </p>
          <input
            type="number"
            value={plannedWater}
            onChange={e => setPlannedWater(e.target.value)}
            min="0"
          />
        </div>
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default DailyNormaModal;
