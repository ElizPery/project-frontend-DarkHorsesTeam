import { useEffect } from 'react';
import { selectIsRefreshing } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import RefreshingPage from './pages/RefreshingPage/RefreshingPage';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { SharedLayout } from './components/SharedLayout';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    // dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? <RefreshingPage /> : (
    <SharedLayout>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
};

export default App;
