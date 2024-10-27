import css from './WaterRatioPanel.module.css';
import icons from '../../images/icons/icons.svg';
import { useSelector } from 'react-redux';
import { selectDailyWaterIntake } from '../../redux/water/selectors';
import { useState } from 'react';
import TodayListModal from '../TodayListModal/TodayListModal';
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/operations';

export default function WaterRatioPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);

  const dispatch = useDispatch();

  const { percentage } = useSelector(selectDailyWaterIntake);
  let parsedWaterRatio = parseInt(percentage);
  if (parsedWaterRatio >= 100) {
    parsedWaterRatio = 100;
  }

  let width = parsedWaterRatio;
  if (parsedWaterRatio >= 60) {
    width = parsedWaterRatio + 3;
  }

  const handleAddWaterClick = () => {
    setItemToAdd({ volume: 0, date: new Date().toISOString() });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAddWater = newItem => {
    dispatch(addWater(newItem));
    setIsModalOpen(false);
  };

  return (
    <section className={css.container}>
      <div className={css.labelContainer}>
        <h2 className={css.label}>Today</h2>
      </div>
      <div className={css.progressAndButtWrapp}>
        <div className={css.progressContainer}>
          <div className={css.progressBar}>
            <div
              className={css.progressFill}
              style={{ width: `${parsedWaterRatio}%` }}
            >
              <div
                className={css.elips}
                style={{
                  left: `${width - 1.5}%`,
                  transform: `translateX(-${width - 1.5}%)`,
                }}
              ></div>
            </div>
          </div>
          <div className={css.percentageContainer}>
            <div className={css.textPercentWrap}>
              <span className={css.textPercent}>0%</span>
            </div>
            <div className={css.textPercentWrap}>
              <span className={css.textPercentSecond}>50%</span>
            </div>
            <div className={css.textPercentWrap}>
              <span className={css.textPercent}>100%</span>
            </div>
          </div>
        </div>
        <button className={css.addButton} onClick={handleAddWaterClick}>
          <svg className={css.icons}>
            <use
              href={`${icons}#icon-plus-circle`}
              className={css.iconUse}
            ></use>
          </svg>
          <p className={css.textButt}>Add Water </p>
        </button>
      </div>

      <TodayListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAddWater}
        item={itemToAdd}
        isAdding={true}
      />
    </section>
  );
}
