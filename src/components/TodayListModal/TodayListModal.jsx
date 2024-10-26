import React, { useState } from 'react';
import icons from '../../images/icons/icons.svg';
import Select from 'react-select';
import styles from './TodayListModal.module.css';

function TodayListModal({ isOpen, onClose, onSave }) {
  const [volume, setVolume] = useState(0); // Спрощуємо для тестування
  const [time, setTime] = useState('07:00');
  const [inputVolume, setInputVolume] = useState(volume);

  // Додаємо логування для перевірки пропсів
  console.log('isOpen:', isOpen);
  console.log('onClose:', onClose);
  console.log('onSave:', onSave);

  const handleIncrement = () => {
    setVolume(prev => prev + 50);
    setInputVolume(prev => Number(prev) + 50);
  };

  const handleDecrement = () => {
    if (volume > 50) {
      // Мінімум 50, або можна встановити на 0
      setVolume(prev => prev - 50);
      setInputVolume(prev => Number(prev) - 50);
    } else {
      setVolume(0); // Не допускаємо значення нижче 0
      setInputVolume(0);
    }
  };

  const handleInputChange = e => {
    let newValue = e.target.value.replace(/^0+/, ''); // Видаляємо ведучі нулі
    if (Number(newValue) < 0) {
      newValue = 0; // Якщо менше 0, встановлюємо 0
    }
    setInputVolume(newValue);
  };

  const handleBlur = () => {
    if (inputVolume === '') {
      setInputVolume(''); // Залишаємо пустим, якщо введено порожнє значення
    } else if (Number(inputVolume) < 0) {
      setVolume(0); // Забороняємо від'ємні значення
      setInputVolume(0);
    } else {
      setVolume(Number(inputVolume));
    }
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave({ volume, time });
    }
    if (onClose) {
      onClose();
    }
  };

  const options = [...Array(24)].flatMap((_, hour) =>
    [...Array(12)].map((_, minuteIndex) => {
      const minute = minuteIndex * 5;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      return { value: formattedTime, label: formattedTime };
    })
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'solid 1px #D7E3FF', // Зміни на потрібний колір
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'blue', // Зміни на потрібний колір
      },
      ...(state.isFocused && {
        borderColor: '#407BFF', // Колір бордеру при фокусі
      }),
      padding: '0px', // Задай потрібний padding
      backgroundColor: 'white', // Фон
      borderRadius: '6px',
      height: '44px', // Закруглення кутів
    }),
    singleValue: provided => ({
      ...provided,
      color: 'rgb(64, 123, 255)',
      fontSize: '16px',
      fontWeight: '400', // Зміни на потрібний колір тексту
    }),
    indicator: provided => ({
      ...provided,
      color: 'blue', // Зміни на потрібний колір стрілочки
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: '#407BFF', // Зміни на потрібний колір стрілочки
    }),
    menu: provided => ({
      ...provided,
      zIndex: 9999, // Щоб меню було поверх інших елементів
      marginTop: '0', // Прибрати відступ зверху
      borderRadius: '4px', // Закруглення кутів меню
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Тінь меню
    }),
    menuList: provided => ({
      ...provided,
      padding: '0', // Прибрати padding в меню
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#D7E3FF'
        : state.isFocused
        ? '#94ade7'
        : 'white', // Колір фону
      color: 'black', // Колір тексту
      padding: '12px 10px', // Внутрішній відступ для елементів меню
    }),
  };

  // Перевіряємо умову рендерингу модального вікна
  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${isOpen ? styles.isOpen : ''}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg className={styles.icons}>
            <use href={`${icons}#close`}></use>
          </svg>
        </button>
        <h2 className={styles.header}>Edit the entered amount of water</h2>
        <div className={styles.waterAmountContainer}>
          <svg className={styles.iconGlass}>
            <use href={`${icons}#glass`}></use>
          </svg>
          <div className={styles.contAmountTimeData}>
            <span className={styles.waterAmount}>{volume} ml</span>
            <span className={styles.waterTime}>{time}</span>
          </div>
        </div>
        <div className={styles.correctData}>
          <p className={styles.titleCorrect}>Correct entered data:</p>
          <div className={styles.contAmPlMn}>
            <p className={styles.subTitleCorrect}>Amount of water:</p>
            <div className={styles.inputContainer}>
              <button className={styles.decrement} onClick={handleDecrement}>
                <svg className={styles.iconsMinus}>
                  <use href={`${icons}#icon-minus-small`}></use>
                </svg>
              </button>
              <span className={styles.volumeDisplay}>{volume}ml</span>
              <button className={styles.increment} onClick={handleIncrement}>
                <svg className={styles.iconsPlus}>
                  <use href={`${icons}#close`}></use>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.timeInputContainer}>
            <label htmlFor="time" className={styles.subTitleCorrect}>
              Recording time:
            </label>
            <Select
              id="time"
              value={options.find(option => option.value === time)}
              onChange={option => setTime(option.value)}
              options={options}
              styles={customStyles}
              tabIndex={0}
              className={styles.timeSelect}
            />
          </div>
          <div className={styles.inputVolumeContainer}>
            <label htmlFor="volume" className={styles.subTitleEntVol}>
              Enter the value of the water used:
            </label>
            <input
              id="volume"
              type="number"
              value={inputVolume}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={styles.inputVolume}
            />
          </div>
          <div className={styles.totalSaveCont}>
            <span className={styles.volumeTotalDisplay}>{volume}ml</span>
            <button className={styles.saveButton} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayListModal;
