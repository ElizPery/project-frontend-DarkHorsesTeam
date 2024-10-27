import { useState } from 'react';
import styles from './DailyNorma.module.css';
import { selectUser } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';
export default function DailyNorma() {

  const user = useSelector(selectUser);


  const [openDailyNormaModal, setOpenDailyNormaModal] = useState(false);
  const closeModal = () => setOpenDailyNormaModal(false);
  const openModal = () => setOpenDailyNormaModal(true);

  const dailyNorma = user.dailyNorma / 1000;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>My daily norma</h3>
      <div className={styles.user_info_container}>
        <p className={styles.paragraph}>
          {dailyNorma ? `${dailyNorma}L` : '2.0L'}
        </p>
        <button
          className={styles.button}
          onClick={() => openModal()}
          type="button"
        >
          Edit
        </button>
        <DailyNormaModal
        isOpen={openDailyNormaModal}
        onClose={closeModal}/>
      </div>
    </div>
  );
}
