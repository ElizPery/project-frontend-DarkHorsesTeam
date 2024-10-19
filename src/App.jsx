import { lazy, useEffect } from 'react';
import { selectIsRefreshing } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import RefreshingPage from './pages/RefreshingPage/RefreshingPage';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { SharedLayout } from './components/SharedLayout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    // dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <RefreshingPage />
  ) : (
    <SharedLayout>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SignupPage />} redirectTo="/home" />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute component={<SigninPage />} redirectTo="/home" />
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/signin" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
