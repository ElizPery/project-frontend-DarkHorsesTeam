import * as React from 'react';
import { useEffect, useState } from 'react';
import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  selectDailyWaterIntake,
  selectMonthIntake,
} from '../../redux/water/selectors.js';
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

  const { data } = useSelector(selectMonthIntake);
  const { percentage } = useSelector(selectDailyWaterIntake);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const today = new Date();
  const isToday = today.getDate() === day;
  const isCurrentMonth =
    today.toLocaleString('en-US', { month: 'long' }) === monthName;

  useEffect(() => {
    if (isToday && isCurrentMonth) {
      const todayPercentage = percentage.replace('%', '');
      setPersent(todayPercentage >= 100 ? '100' : todayPercentage);
      setTrigger(todayPercentage < 100);
    } else {
      const dayData = data.find(
        item =>
          item.date.slice(8) === day.toString() ||
          item.date.slice(8) === `0${day}`
      );

      if (dayData) {
        const dayPercentage = parseInt(dayData.percentage.slice(0, -1));
        setPersent(dayPercentage >= 100 ? '100' : dayPercentage.toString());
        setTrigger(dayPercentage < 100);
      } else {
        setPersent('0');
        setTrigger(true);
      }
    }
  }, [data, day, percentage, isToday, isCurrentMonth]);

  const handleDayClick = element => {
    setAnchorEl(element.currentTarget);
    setActiveDay(activeDay === day ? null : day);
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
