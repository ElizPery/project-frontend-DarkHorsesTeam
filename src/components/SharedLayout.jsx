import { Suspense } from 'react';

import Loader from '../components/Loader/Loader';

export const SharedLayout = ({ children }) => {
    return (
        <div>
            <h1>Header</h1>
            <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
    );
};
