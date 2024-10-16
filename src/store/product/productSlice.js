import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    }
});

export default productSlice.reducer;
