import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTodayWater,
  addWater,
  updateWater,
  deleteWater,
  getWaterMonth,
} from './operations';

const initialState = {
  dailyWaterIntake: {
    records: [],
    percentage: 0,
    totalWaterAmount: 0,
  },
  monthIntake: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchTodayWater.pending, handlePending)
      .addCase(fetchTodayWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyWaterIntake.records = action.payload.data;
        state.dailyWaterIntake.percentage = action.payload.totalWaterPercent;
        state.dailyWaterIntake.totalWaterAmount =
          action.payload.totalWaterAmount;
        state.error = null;
      })
      .addCase(fetchTodayWater.rejected, handleRejected)

      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyWaterIntake.records.push(action.payload);
        state.dailyWaterIntake.totalWaterAmount += action.payload.volume;
        state.error = null;
      })
      .addCase(addWater.rejected, handleRejected)

      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.dailyWaterIntake.records.findIndex(
          record => record._id === action.payload._id
        );
        if (index !== -1) {
          state.dailyWaterIntake.records[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateWater.rejected, handleRejected)

      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyWaterIntake.records = state.dailyWaterIntake.records.filter(
          record => record._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(getWaterMonth.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthIntake = action.payload;
      })
      .addCase(getWaterMonth.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default waterSlice.reducer;
