import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodayWater } from '../../redux/water/operations.js';
import {
  selectDailyWaterIntake,
  selectIsLoading,
  selectError,
} from '../../redux/water/selectors.js';
import icons from '../../images/icons/icons.svg';
import styles from './TodayWaterList.module.css';
import waterBottleImg from '../../images/TodayWaterListBottle/TodayWaterListBottle-Mobile.png';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const dailyWaterIntake = useSelector(selectDailyWaterIntake) || {
    records: [],
  };
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Today</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles.scrollContainer}>
        {dailyWaterIntake.records.length === 0 ? (
          <></>
        ) : (
          <ul className={styles.list}>
            {dailyWaterIntake.records.map(record => (
              <li key={record._id} className={styles.item}>
                <div className={styles.iconWrapper}>
                  <img
                    src={waterBottleImg}
                    alt="Water Glass"
                    className={styles.iconPng}
                  />
                  <div className={styles.recordDetails}>
                    <span className={styles.volume}>{record.volume} ml</span>
                    <span className={styles.time}>
                      {new Date(record.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className={styles.actionIcons}>
                  <button className={styles.editIcon}>
                    <svg className={styles.iconPencil}>
                      <use href={`${icons}#icon-pencil-square`}></use>
                    </svg>
                  </button>
                  <button className={styles.deleteIcon}>
                    <svg className={styles.iconDelete}>
                      <use href={`${icons}#icon-trash`}></use>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton}>+ Add Water</button>
      </div>
    </div>
  );
}
