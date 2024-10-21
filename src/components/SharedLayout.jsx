import { Suspense } from 'react';

import Loader from '../components/Loader/Loader';
import Header from '../components/Header/Header.jsx';

export const SharedLayout = ({ children }) => {
    return (
      <div>
        <Header />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </div>
    );
};
