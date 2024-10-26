import { useState, useEffect } from 'react';
import styles from './TodayListModal.module.css';
import icons from '../../images/icons/icons.svg';

function TodayListModal({ isOpen, onClose, onConfirm, item }) {
  const [volume, setVolume] = useState(item?.volume || 0);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (item) {
      setVolume(item.volume);
      const recordTime = new Date(item.date);
      setTime(
        recordTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
  }, [item]);

  if (!isOpen) return null;

  const handleVolumeChange = newVolume => {
    if (newVolume >= 0) setVolume(newVolume);
  };

  const handleTimeChange = event => {
    setTime(event.target.value);
  };

  const handleSave = () => {
    if (!item?._id) {
      console.error('Item ID is undefined.');
      return;
    }
    const updatedItem = {
      ...item,
      volume,
      date: new Date(item.date).setHours(
        time.split(':')[0],
        time.split(':')[1]
      ),
    };
    onConfirm(updatedItem);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.titleClose}>
          <h2 className={styles.title}>Edit the entered amount of water</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg className={styles.iconClose}>
              <use href={`${icons}#close`}></use>
            </svg>
          </button>
        </div>

        <div className={styles.waterDetails}>
          <svg className={styles.iconGlassWater}>
            <use href={`${icons}#icon-glass-water`}></use>
          </svg>
          <div className={styles.details}>
            <span className={styles.volume}>{volume} ml</span>
            <span className={styles.time}>{time}</span>
          </div>
        </div>

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
              type="time"
              value={time}
              onChange={handleTimeChange}
              className={styles.timeInput}
            />
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

export default TodayListModal;
