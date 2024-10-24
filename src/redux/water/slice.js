import { createSlice } from "@reduxjs/toolkit";
import { getWaterMonth } from "./operations";

const initialState = {
    dailyWaterIntake: {
        records: [],
        percentage: 0,
        totalWaterAmount: 0,
        dailyNorma: 1500
    },
    monthIntake: [],
    isLoading: false,
    error: null,
}

// const handlePending = (state) => {
//     state.isLoading = true;
// }

// const handleRejected = (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
// }

const waterSlice = createSlice({
    name: "water",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getWaterMonth.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getWaterMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.monthIntake = action.payload;
            })
            .addCase(getWaterMonth.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
    
})

export default waterSlice.reducer;