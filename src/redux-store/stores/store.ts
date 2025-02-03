import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth-reducer';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;