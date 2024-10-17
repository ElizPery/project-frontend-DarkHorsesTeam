import { createSlice } from "@reduxjs/toolkit";

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
            // .addCase(addWater.pending, handlePending)
    }
    
})

export default waterSlice.reducer;