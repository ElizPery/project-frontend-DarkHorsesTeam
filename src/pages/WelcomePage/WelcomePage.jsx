import DocumentTitle from '../../components/DocumentTitle';
import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater.jsx';
import WaterConsumptionTracker from '../../components/WaterConsumptionTracker/WaterСonsumptionTracker.jsx';
import css from './WelcomePage.module.css';
import DailyNormaModal from '../../components/DailyNormaModal/DailyNormaModal.jsx';
export default function WelcomePage() {
  return (
    <div className={css.container}>
      <DocumentTitle>Welcome page</DocumentTitle>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
      <DailyNormaModal />
    </div>
  );
}
