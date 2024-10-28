import { useState, useEffect } from 'react';
import styles from './TodayListModal.module.css';
import icons from '../../images/icons/icons.svg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { toast } from 'react-hot-toast';

export default function TodayListModal({
  isOpen,
  onClose,
  onConfirm,
  item,
  isAdding,
}) {
  const [volume, setVolume] = useState(0);
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [error, setError] = useState('');

  const [initialVolume, setInitialVolume] = useState(0);
  const [initialTime, setInitialTime] = useState('');

  const dailyNorma = useSelector(selectUser).dailyNorma;

  useEffect(() => {
    if (isOpen) {
      setShowTimePicker(false);
      if (item && !isAdding) {
        setVolume(item.volume);
        const recordTime = new Date(item.date);
        setTime(
          recordTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        setInitialVolume(item.volume);
        setInitialTime(
          recordTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        );
      } else {
        const now = new Date();
        setVolume(150);
        setTime(
          now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        );
        setInitialVolume(150);
        setInitialTime(
          now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        );
      }
    }
  }, [isOpen, item, isAdding]);

  if (!isOpen) return null;

  const handleVolumeChange = newVolume => {
    if (newVolume >= 0) {
      setVolume(newVolume);
      setError('');
    }
  };

  const handleSave = () => {
    if (volume <= 0) {
    toast.error('Value must be greater than 0.'); 
    console.error('Volume must be greater than 0.');
    return;
  }
    if (!item?._id && !isAdding) {
      console.error('Item ID is undefined.');
      return;
    }

    const [hours, minutes] = time.split(':');
    let localDate;

    if (isAdding) {
      localDate = new Date();
      localDate.setHours(Number(hours), Number(minutes), 0, 0);
    } else {
      localDate = new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate(),
          Number(hours),
          Number(minutes)
        )
      );
    }

    const updatedItem = {
      ...item,
      volume,
      date: localDate.toISOString(),
    };

    if (isAdding) {
      const newRecord = {
        volume,
        date: updatedItem.date,
        dailyNorma,
      };
      onConfirm(newRecord);
    } else {
      onConfirm(updatedItem);
    }
  };

  const toggleTimePicker = () => {
    setShowTimePicker(prev => !prev);
  };

  const handleHourChange = hour => {
    const [_, currentMinute] = time.split(':');
    const newTime = `${hour < 10 ? `0${hour}` : hour}:${currentMinute}`;
    setTime(newTime);
  };

  const handleMinuteChange = minute => {
    const [currentHour, _] = time.split(':');
    const newTime = `${currentHour}:${minute < 10 ? `0${minute}` : minute}`;
    setTime(newTime);
  };

  const handleOutsideClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <div className={styles.titleClose}>
          <h2 className={styles.title}>
            {isAdding ? 'Add Water' : 'Edit the entered amount of water'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg className={styles.iconClose}>
              <use href={`${icons}#close`}></use>
            </svg>
          </button>
        </div>

        {!isAdding && (
          <div className={styles.waterDetails}>
            <svg className={styles.iconGlassWater}>
              <use href={`${icons}#icon-glass-water`}></use>
            </svg>
            <div className={styles.details}>
              <span className={styles.volume}>{initialVolume} ml</span>
              <span className={styles.time}>{initialTime}</span>
            </div>
          </div>
        )}

        <div className={styles.inputs}>
          <div className={styles.amountWaterButton}>
            <h3 className={styles.subtitle}>Correct entered data:</h3>
            <p>Amount of water:</p>
            <div className={styles.counter}>
              <button
                className={styles.btnVolume}
                onClick={() => handleVolumeChange(volume - 50)}
              >
                <svg className={styles.iconValue}>
                  <use href={`${icons}#icon-minus-small`}></use>
                </svg>
              </button>
              <span className={styles.volumeInputButton}>{volume}ml</span>
              <button
                className={styles.btnVolume}
                onClick={() => handleVolumeChange(volume + 50)}
              >
                <svg className={styles.iconValue}>
                  <use href={`${icons}#icon-plus-small`}></use>
                </svg>
              </button>
            </div>
            {error && <span className={styles.error}>{error}</span>}
          </div>

          <div className={styles.amountTimeInput}>
            <p>Recording time:</p>
            <input
              type="text"
              value={time}
              onClick={toggleTimePicker}
              className={styles.timeInput}
              readOnly
            />
            {showTimePicker && (
              <div className={styles.timePicker}>
                <div className={styles.timeColumns}>
                  <div className={styles.hoursColumn}>
                    {[...Array(24).keys()].map(hour => (
                      <div
                        key={hour}
                        onClick={() => handleHourChange(hour)}
                        className={styles.hourOption}
                      >
                        {hour < 10 ? `0${hour}` : hour}
                      </div>
                    ))}
                  </div>
                  <div className={styles.minutesColumn}>
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                      minute => (
                        <div
                          key={minute}
                          onClick={() => handleMinuteChange(minute)}
                          className={styles.minuteOption}
                        >
                          {minute < 10 ? `0${minute}` : minute}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.amountWaterInput}>
            <h3 className={styles.subtitle}>
              Enter the value of the water used:
            </h3>
            <input
              type="number"
              value={volume > 0 ? volume : ''}
              min="0"
              onChange={e => handleVolumeChange(Number(e.target.value))}
              onBlur={() => handleVolumeChange(volume)}
              // className={`${styles.numberInput} ${
              //   error ? styles.errorInput : ''
              // }`}
              onFocus={() => setVolume('')}
              className={styles.numberInput}
            />

            {error && <span className={styles.error}>{error}</span>}
          </div>
        </div>
        <div className={styles.saveValue}>
          <p className={styles.volumeChange}>{volume}ml</p>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
