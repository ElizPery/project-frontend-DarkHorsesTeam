import { useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import toast, { Toaster } from 'react-hot-toast';
import css from './HomePage.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { useEffect } from 'react';
export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      toast.success('Login successfully!');
    }
  }, [isLoggedIn]);
  return (
    <div className={css.container}>
      <DocumentTitle>Home page</DocumentTitle>
      <Toaster />
      <WaterRatioPanel />
      <TodayWaterList />
      <MonthStatsTable />
    </div>
  );
};

