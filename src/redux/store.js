import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import waterReducer from './water/slice';
import authReducer from './auth/slice';

const persistedAuthReducer = persistReducer(
  {
    key: 'auth-token',
    storage,
    whitelist: ['token'],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    water: waterReducer,
    auth: persistedAuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
