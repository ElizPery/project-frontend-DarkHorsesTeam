import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodayWater,
  deleteWater,
  updateWater,
  addWater,
} from '../../redux/water/operations.js';
import {
  selectDailyWaterIntake,
  selectIsLoading,
  selectError,
} from '../../redux/water/selectors.js';
import icons from '../../images/icons/icons.svg';
import ModalDelete from './ModalDelate/ModalDelate.jsx';
import TodayListModal from '../TodayListModal/TodayListModal.jsx';
import styles from './TodayWaterList.module.css';

export default function TodayWaterList() {
  const dispatch = useDispatch();
  const dailyWaterIntake = useSelector(selectDailyWaterIntake) || {
    records: [],
  };
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isAddingWater, setIsAddingWater] = useState(false);

  useEffect(() => {
    dispatch(fetchTodayWater());
  }, [dispatch]);

  const handleDelete = item => {
    setItemToDelete(item);
    setModalOpen(true);
  };

  const confirmDelete = item => {
    dispatch(deleteWater(item._id)).then(() => {
      dispatch(fetchTodayWater());
      setModalOpen(false);
    });
  };

  const handleEdit = item => {
    setItemToEdit(item);
    setEditModalOpen(true);
    setIsAddingWater(false);
  };

  const handleConfirm = item => {
    const { _id, volume, date } = item;
    const formattedData = {
      volume,
      date: new Date(date).toISOString().slice(0, 16),
    };

    console.log('Updating with ID:', _id, 'and data:', formattedData);
    dispatch(updateWater({ id: _id, waterData: formattedData })).then(() => {
      dispatch(fetchTodayWater());
      setEditModalOpen(false);
    });
  };

  const handleAddWater = () => {
    setItemToEdit(null);
    setIsAddingWater(true);
    setEditModalOpen(true);
  };

  const handleConfirmAddWater = newItem => {
    dispatch(addWater(newItem)).then(() => {
      dispatch(fetchTodayWater());
      setEditModalOpen(false);
      setIsAddingWater(false);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    setIsAddingWater(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Today</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles.scrollContainer}>
        {dailyWaterIntake.records.length === 0 ? (
          <></>
        ) : (
          <ul className={styles.list}>
            {dailyWaterIntake.records.map(record => (
              <li key={record._id} className={styles.item}>
                <div className={styles.iconWrapper}>
                  <svg className={styles.iconGlassWater}>
                    <use href={`${icons}#icon-glass-water`}></use>
                  </svg>
                  <div className={styles.recordDetails}>
                    <span className={styles.volume}>{record.volume} ml</span>
                    <span className={styles.time}>
                      {new Date(record.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className={styles.actionIcons}>
                  <button
                    className={styles.editIcon}
                    onClick={() => handleEdit(record)}
                  >
                    <svg className={styles.iconPencil}>
                      <use href={`${icons}#icon-pencil-square`}></use>
                    </svg>
                  </button>
                  <button
                    className={styles.deleteIcon}
                    onClick={() => handleDelete(record)}
                  >
                    <svg className={styles.iconDelete}>
                      <use href={`${icons}#icon-trash`}></use>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={handleAddWater}>
          + Add Water
        </button>
      </div>

      <ModalDelete
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

      <TodayListModal
        isOpen={editModalOpen}
        onClose={closeModal}
        onConfirm={isAddingWater ? handleConfirmAddWater : handleConfirm}
        item={itemToEdit}
        isAdding={isAddingWater}
      />
    </div>
  );
}
