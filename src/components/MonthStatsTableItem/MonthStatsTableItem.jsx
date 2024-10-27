import { useState } from 'react';
import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectMonthIntake } from '../../redux/water/selectors';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';

export default function MonthStatsTableItem({
  day,
  monthName,
  activeDay,
  setActiveDay,
}) {
  let persent = '0';
  let trigger = true;

  const { data } = useSelector(selectMonthIntake);
  const [x, setX] = useState(-1);

  data.map(item => {
    if (item.date.slice(8) === day.toString()) {
      if (Number(item.percentage.slice(0, 3)) > 100) {
        persent = '100';
        trigger = false;
        return;
      }
      persent = item.percentage.slice(0, 2);
      trigger = true;
      return;
    }
  });
  const handleDayClick = element => {
    setX(element.pageX);
    if (activeDay === day) {
      setActiveDay(null);
    } else {
      setActiveDay(day);
    }
  };
  const isActive = activeDay === day;
  return (
    <div className={css.box}>
      <span
        className={clsx(css.day, trigger && css.dayBorder)}
        onClick={e => handleDayClick(e)}
      >
        {day}
      </span>
      <p className={css.persent}>{`${persent}%`}</p>
      {isActive && (
        <DaysGeneralStats
          Stats
          date={`${day}, ${monthName}`}
          dailyNorm={
            data.find(item => item.date.slice(8) === day.toString())
              ?.dailyNorma / 1000 || '1.5'
          }
          fulfillment={persent}
          servings={
            data.find(item => item.date.slice(8) === day.toString())
              ?.consumptionCount || 0
          }
          centerPosition={x}
        />
      )}
    </div>
  );
}
