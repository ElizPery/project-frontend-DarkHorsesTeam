//import { TbError404 } from 'react-icons/tb';
//import DocumentTitle from '../../components/DocumentTitle';
//import css from './NotFoundPage.module.css';

//export default function NotFoundPage() {
//  return (
//    <div>
//      <DocumentTitle>Not found</DocumentTitle>

   //   <div className={css.container}>
    //    <TbError404 className={css.errorIcon} />
    //    <h1 className={css.title}>Sorry, page not found</h1>
 //     </div>
 //   </div>
//  );
//}

import { useState } from 'react';
import SettingModal from '../../components/SettingModal/SettingModal.jsx';

const NotFoundPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Settings</button>
      <SettingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default NotFoundPage;