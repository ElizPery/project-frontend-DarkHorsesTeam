import DocumentTitle from '../../components/DocumentTitle';
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
// import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
// import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx';
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import mobileBottleBackground1x from '../../images/homePage/bottle-home-mobile.png';
import mobileBottleBackground2x from '../../images/homePage/bottle-home-mobile_2x.png';
import tabletBottleBackground1x from '../../images/homePage/bottle-home-tablet.png';
import tabletBottleBackground2x from '../../images/homePage/bottle-home-tablet_2x.png';
import deskBottleBackground1x from '../../images/homePage/bottle-home-desk.png';
import deskBottleBackground2x from '../../images/homePage/bottle-home-desk_2x.png';
import mobileBackground1x from '../../images/homePage/background-home-mobile.png';
import mobileBackground2x from '../../images/homePage/background-home-mobile_2x.png';
import tabletBackground1x from '../../images/homePage/background-home-tablet.png';
import tabletBackground2x from '../../images/homePage/background-home-tablet_2x.png';
import deskBackground1x from '../../images/homePage/background-home-desk.png';
import deskBackground2x from '../../images/homePage/background-home-desk_2x.png';

import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={styles.section}>
      <DocumentTitle>Home page</DocumentTitle>
      <div className={styles.hero_container}>
        <div className={styles.daily_norma}>
          <DailyNorma />
        </div>

        <picture className={styles.bottle}>
          <source
            className={styles.bg_bottle}
            media="(min-width: 320px) and (max-width: 767px)"
            srcSet={`${mobileBottleBackground1x} 1x, ${mobileBottleBackground2x} 2x `}
          />
          <source
            className={styles.bg_bottle}
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={`${tabletBottleBackground1x} 1x, ${tabletBottleBackground2x} 2x `}
          />
          <source
            className={styles.bg_bottle}
            media="(min-width: 1440px)"
            srcSet={`${deskBottleBackground1x} 1x, ${deskBottleBackground2x} 2x `}
          />
          <img
            className={styles.bg_bottle}
            src={mobileBottleBackground1x}
            alt="Background element"
          />
        </picture>
        <img
          className={styles.ratio_panel}
          src="https://res.cloudinary.com/ddo1zjbil/image/upload/v1729616387/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-10-22_195925_rbfuff.png"
          alt=""
        />
      </div>
      {/* <WaterRatioPanel /> */}
      <div className={styles.container}>
        <img
          className={styles.today_list}
          src="https://res.cloudinary.com/ddo1zjbil/image/upload/v1729617200/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-10-22_201230_mwwael.png"
          alt=""
        />
        <img
          className={styles.month_stats}
          src="https://res.cloudinary.com/ddo1zjbil/image/upload/v1729617200/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2024-10-22_201252_hscswl.png"
          alt=""
        />
        {/* <TodayWaterList /> */}
        {/* <MonthStatsTable /> */}
      </div>
      <picture className={styles.point}>
        <source
          className={styles.bg_point}
          media="(min-width: 320px) and (max-width: 767px)"
          srcSet={`${mobileBackground1x} 1x, ${mobileBackground2x} 2x `}
        />
        <source
          className={styles.bg_point}
          media="(min-width: 768px) and (max-width: 1439px)"
          srcSet={`${tabletBackground1x} 1x, ${tabletBackground2x} 2x `}
        />
        <source
          className={styles.bg_point}
          media="(min-width: 1440px)"
          srcSet={`${deskBackground1x} 1x, ${deskBackground2x} 2x `}
        />
        <img
          className={styles.bg_point}
          src={mobileBackground1x}
          alt="Background element"
        />
      </picture>
    </section>
  );
}
