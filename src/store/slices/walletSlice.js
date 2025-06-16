import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/wallet/${userId}/balance`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMoney = createAsyncThunk(
  'wallet/sendMoney',
  async ({ recipientId, amount, description }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/wallet/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientId, amount, description }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send money');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const topUpWallet = createAsyncThunk(
  'wallet/topUp',
  async ({ amount, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, paymentMethod }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to top up wallet');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: 0,
    currency: 'USD',
    isLoading: false,
    error: null,
    lastTransaction: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch balance
      .addCase(fetchWalletBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
        state.currency = action.payload.currency;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Send money
      .addCase(sendMoney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.newBalance;
        state.lastTransaction = action.payload.transaction;
      })
      .addCase(sendMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Top up
      .addCase(topUpWallet.fulfilled, (state, action) => {
        state.balance = action.payload.newBalance;
        state.lastTransaction = action.payload.transaction;
      });
  },
});

export const { clearError, updateBalance } = walletSlice.actions;
export default walletSlice.reducer; 