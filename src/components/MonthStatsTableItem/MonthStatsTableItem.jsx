import * as React from 'react';
import { useState } from 'react';
import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectMonthIntake } from '../../redux/water/selectors';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import Popover from '@mui/material/Popover';

export default function MonthStatsTableItem({
  day,
  monthName,
  activeDay,
  setActiveDay,
}) {
  let persent = '0';
  let trigger = true;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = useSelector(selectMonthIntake);

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
