import styles from './WhyDrinkWater.module.css';
export default function WhyDrinkWater() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Why drink water</h3>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>
            Supply of nutrients to all organs
          </p>
        </li>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>Providing oxygen to the lungs</p>
        </li>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>
            Maintaining the work of the heart
          </p>
        </li>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>Release of processed substances</p>
        </li>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>
            Ensuring the stability of the internal environment
          </p>
        </li>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>
            Maintaining within the normal temperature
          </p>
        </li>
        <li className={styles.list_item}>
          <p className={styles.list_item_p}>
            Maintaining an immune system capable of resisting disease
          </p>
        </li>
      </ul>
    </section>
  );
}
