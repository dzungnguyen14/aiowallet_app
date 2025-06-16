import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/transactions?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    isLoading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        const { transactions, hasMore, page } = action.payload;
        
        if (page === 1) {
          state.transactions = transactions;
        } else {
          state.transactions = [...state.transactions, ...transactions];
        }
        
        state.hasMore = hasMore;
        state.currentPage = page;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, addTransaction, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer; 