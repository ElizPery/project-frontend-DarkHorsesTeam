import css from './WaterConsumptionTracker.module.css';
import icons from '../../images/icons/icons.svg';
import { Link } from 'react-router-dom';

export default function WaterConsumptionTracker () {
    return <section>
        <h1 className={css.title}>Water consumption tracker</h1>
        <h2 className={css.subtitle}>Record daily water intake and track</h2>
        <h3 className={css.listTitle}>Tracker Benefits</h3>
        <ul className={css.list}>
            <li className={css.item}>
                <svg className={css.icons}>
                    <use href={`${icons}#calendar-days/outline`}></use>
                </svg>
                <p className={css.itemText}>Habit drive</p>
            </li>
            <li className={css.item}>
                <svg className={css.icons}>
                    <use href={`${icons}#presentation-chart-bar/outline`}></use>
                </svg>
                <p className={css.itemText}>View statistics</p>
            </li>
            <li className={css.item}>
                <svg className={css.icons}>
                    <use href={`${icons}#wrench-screwdriver/outline`}></use>
                </svg>
                <p className={css.itemText}>Personal rate setting</p>
            </li>
        </ul>
        <Link to='/signup' className={css.btn}>Try tracker</Link>
    </section>
};