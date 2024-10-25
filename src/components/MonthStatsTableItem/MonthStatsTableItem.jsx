import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMonthIntake } from '../../redux/water/selectors';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';

export default function MonthStatsTableItem({ day }) {
    const [showStats, setShowStats] = useState(false);
    let persent = "0"
    let trigger = true;
    
    const { data } = useSelector(selectMonthIntake);
    data.map((item) => {
        if (item.date.slice(8) === day.toString()) {
            if (Number(item.percentage.slice(0,3))>100) {
                persent = '100';
                trigger = false
                return
            };
            persent = item.percentage.slice(0, 2);
            trigger = true;
            return
        }
    })
    const handleDayClick = () => {
        setShowStats(!showStats);
    };
    return <div className={css.box}>
    <span className={clsx(css.day, trigger && css.dayBorder)} onClick={handleDayClick}>{day}</span>
        <p className={css.persent}>{`${persent}%`}</p>
    {showStats && (
                <DaysGeneralStats
                    date={`${day} April`}  
                    dailyNorm={data.find(item => item.date.slice(8) === day.toString())?.dailyNorm || '2.0'}
                    fulfillment={persent}
                    servings={data.find(item => item.date.slice(8) === day.toString())?.servings || 0}
                />
            )}
    </div>
};