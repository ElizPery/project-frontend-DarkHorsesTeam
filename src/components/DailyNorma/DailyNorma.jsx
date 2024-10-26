import { useState } from 'react';
import styles from './DailyNorma.module.css';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
export default function DailyNorma() {
  const [openDailyNormaModal, setOpenDailyNormaModal] = useState(false);
  // const closeModal = () => setOpenDailyNormaModal(false);
  // const openModal = () => setOpenDailyNormaModal(true);
  const dailyNorma = 1.5;
  return <div><div className={styles.container}>
      <h3 className={styles.title}>My daily norma</h3>
      <div className={styles.user_info_container}>
        <p className={styles.paragraph}>
          {dailyNorma ? `${dailyNorma}L` : '2.0L'}
        </p>
        <button
          className={styles.button}
          onClick={() => setOpenDailyNormaModal(true)}
          type="button"
        >
          Edit
        </button>
      </div>
  </div>
    {openDailyNormaModal && <DailyNormaModal modalTrigger={openDailyNormaModal} closeModal={setOpenDailyNormaModal} />}
    </div>
};
