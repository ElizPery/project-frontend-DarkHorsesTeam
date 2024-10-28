import * as React from 'react';
import { useEffect, useState } from 'react';
import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectMonthIntake } from '../../redux/water/selectors.js';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import Popover from '@mui/material/Popover';

export default function MonthStatsTableItem({
  day,
  monthName,
  activeDay,
  setActiveDay,
}) {
  const [persent, setPersent] = useState('0');
  const [trigger, setTrigger] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = useSelector(selectMonthIntake);

useEffect(() => {
  data.map((item) => {
    if (item.date.slice(8) === day.toString() || item.date.slice(8) === `0${day}`) {
      if (Number(item.percentage.slice(0, 3)) > 100) {
          setPersent('100');
          setTrigger(false);
          return
      };
      setPersent(item.percentage.slice(0, 2));
      setTrigger(true);
      return
    }
  })
}, [data, day]);
  

const handleDayClick = element => {
  setAnchorEl(element.currentTarget);
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
      <Popover
        id={`day${day}`}
        open={anchorEl !== null && isActive}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
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
        />
      </Popover>
    </div>
  );
}
