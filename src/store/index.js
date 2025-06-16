import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import walletSlice from './slices/walletSlice';
import transactionSlice from './slices/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wallet: walletSlice,
    transactions: transactionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
}); 