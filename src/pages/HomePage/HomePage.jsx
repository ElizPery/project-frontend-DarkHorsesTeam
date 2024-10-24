import DocumentTitle from '../../components/DocumentTitle';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';

export default function HomePage() {
  return (
    <div>
      <TodayWaterList />
      <DocumentTitle>Home page</DocumentTitle>
    </div>
  );
}
