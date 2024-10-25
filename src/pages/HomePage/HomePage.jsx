
import { useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import toast, { Toaster } from 'react-hot-toast';
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
    <>
      <DocumentTitle>Home page</DocumentTitle>
      <Toaster />
      <MonthStatsTable />
    </>
  );
}

