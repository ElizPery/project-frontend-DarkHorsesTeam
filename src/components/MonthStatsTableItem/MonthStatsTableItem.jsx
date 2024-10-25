import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectMonthIntake } from '../../redux/water/selectors';

export default function MonthStatsTableItem({ day }) {
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
    
    return <div className={css.box}>
    <span className={clsx(css.day, trigger && css.dayBorder)}>{day}</span>
        <p className={css.persent}>{`${persent}%`}</p>
    </div>
};