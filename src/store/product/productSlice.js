import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    size: "",
    color: "",
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSelectedSize: (state, action) => {
            state.size = action.payload;
        },
        setSelectedColor: (state, action) => {
            state.color = action.payload;
        },
    }
});

export const { setSelectedSize, setSelectedColor } = productSlice.actions;
export default productSlice.reducer;
