import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({
  date,
  dailyNorm,
  fulfillment,
  servings,
  centerPosition,
}) => {
  const popupLength = 280;
  let left = 'auto';
  let right = 'auto';
  if (centerPosition - popupLength / 2 < 0) {
    left = 0;
  }
  if (centerPosition + popupLength / 2 > window.innerWidth) {
    right = 0;
  }

  return (
    <div className={css.container} style={{ left: left, right: right }}>
      <div className={css.allText}>
        <p className={css.date}>{date}</p>
        <p className={css.dailyNorm}>
          <span>Daily norma: </span>
          <span className={css.value}>{dailyNorm} L</span>
        </p>
        <p className={css.fulfillment}>
          <span>Fulfillment of the daily norm: </span>
          <span className={css.value}>{fulfillment}%</span>
        </p>
        <p className={css.servings}>
          <span>How many servings of water: </span>
          <span className={css.value}>{servings}</span>
        </p>
      </div>
    </div>
  );
};

export default DaysGeneralStats;
