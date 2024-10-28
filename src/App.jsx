// App.jsx
import { lazy, useEffect } from 'react';
import { selectIsRefreshing } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import RefreshingPage from './pages/RefreshingPage/RefreshingPage';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { SharedLayout } from './components/SharedLayout';
import { refreshUser, fetchUser } from './redux/auth/operations';
import { selectIsLoggedIn } from './redux/auth/selectors';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const SigninPage = lazy(() => import('./pages/SigninPage/SigninPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const refreshAndFetchUser = async () => {
      await dispatch(refreshUser());
      if (isLoggedIn) {
        await dispatch(fetchUser());
      }
    };

    if (token) {
      refreshAndFetchUser();
    }
  }, [dispatch, token, isLoggedIn]);
  return isRefreshing ? (
    <RefreshingPage />
  ) : (
    <SharedLayout>
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
          }
        />
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
