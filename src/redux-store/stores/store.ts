import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import patinetReducer from '../reducers/patinet-reducer';
import supplierReducer from '../reducers/supplier-reducer';
import drugReducer from '../reducers/drug-reducer';
import invoiceReducer from '../reducers/invoice-reducer';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    patinet:patinetReducer,
    supplier:supplierReducer,
    drug: drugReducer,
    invoice: invoiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
