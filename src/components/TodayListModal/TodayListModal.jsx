import { useState, useEffect } from 'react';
import styles from './TodayListModal.module.css';
import icons from '../../images/icons/icons.svg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';

export default function TodayListModal({
  isOpen,
  onClose,
  onConfirm,
  item,
  isAdding,
}) {
  const [volume, setVolume] = useState(item?.volume || 0);
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const dailyNorma = useSelector(selectUser).dailyNorma;

  useEffect(() => {
    if (item && !isAdding) {
      setVolume(item.volume);
      const recordTime = new Date(item.date);
      setTime(
        recordTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    } else {
      const now = new Date();
      setVolume(150);
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
  }, [item, isAdding]);

  if (!isOpen) return null;

  const handleVolumeChange = newVolume => {
    if (newVolume >= 0) setVolume(newVolume);
  };

  const handleSave = () => {
    if (!item?._id && !isAdding) {
      console.error('Item ID is undefined.');
      return;
    }
    const updatedItem = {
      ...item,
      volume,
      date: new Date(item?.date || Date.now()).setHours(
        Number(time.split(':')[0]),
        Number(time.split(':')[1])
      ),
    };

    if (isAdding) {
      const newRecord = {
        volume,
        date: new Date(updatedItem.date).toISOString(),
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
    const [currentMinute] = time.split(':');
    const newTime = `${hour < 10 ? `0${hour}` : hour}:${currentMinute}`;
    setTime(newTime);
  
  };

  const handleMinuteChange = minute => {
    const [currentHour] = time.split(':');
    const newTime = `${currentHour}:${minute < 10 ? `0${minute}` : minute}`;
    setTime(newTime);

  };

  const handleOutsideClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleOutsideClick} 
    >
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
              <span className={styles.volume}>{volume} ml</span>
              <span className={styles.time}>{time}</span>
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
              value={volume}
              onChange={e => handleVolumeChange(Number(e.target.value))}
              onBlur={() => handleVolumeChange(volume)}
              className={styles.numberInput}
            />
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
