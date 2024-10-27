import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectMonthIntake } from '../../redux/water/selectors';
import { useEffect, useState } from 'react';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';

export default function MonthStatsTableItem({ day, monthName,activeDay, setActiveDay  }) {
    // let persent = "0"
    // let trigger = true;
    const { data } = useSelector(selectMonthIntake);
    const [persent, setPersent] = useState("0");
    const [trigger, setTrigger] = useState(true);
    
    useEffect(() => {
        data.map((item) => {
            if (item.date.slice(8) === day.toString() || item.date.slice(8) === `0${day}`) {
                console.log(item);
                
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
    
    

    // data.map((item) => {
    //     if (item.date.slice(8) === day.toString() || item.date.slice(8) === `0${day}`) {            
    //         if (Number(item.percentage.slice(0,3))>100) {
    //             persent = '100';
    //             trigger = false
    //             return
    //         };
    //         persent = item.percentage.slice(0, 2);
    //         trigger = true;
    //         return
    //     }
    // })
    const handleDayClick = () => {
        if (activeDay === day) {
            setActiveDay(null);
        } else {
            setActiveDay(day);
        }
    };
    const isActive = activeDay === day;
    return <div className={css.box}>
    <span className={clsx(css.day, trigger && css.dayBorder)} onClick={handleDayClick}>{day}</span>
        <p className={css.persent}>{`${persent}%`}</p>
        {isActive && (
                <DaysGeneralStats
                    date={`${day}, ${monthName}`}  
                    dailyNorm={data.find(item => item.date.slice(8) === day.toString())?.dailyNorma / 1000 || '1.5'}
                    fulfillment={persent}
                    servings={data.find(item => item.date.slice(8) === day.toString())?.consumptionCount || 0}
                />
            )}
    </div>
};