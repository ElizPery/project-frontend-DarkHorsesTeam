import DocumentTitle from '../../components/DocumentTitle';
import WaterConsumptionTracker from '../../components/WaterConsumptionTracker/WaterConsumptionTracker.jsx';
import WhyDrinkWater from '../../components/WhyDrinkWater/WhyDrinkWater.jsx';
import css from './WelcomePage.module.css'

export default function WelcomePage() {
  return <div className={css.container}>
      <DocumentTitle>Welcome page</DocumentTitle>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
}
