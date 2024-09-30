import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    increment: (state, action) => {
      const isExist = state?.find((item) => item._id === action.payload._id);
      if (isExist) {
        isExist.quantity = isExist.quantity + 1;
        isExist.totalPrice = isExist.quantity * isExist.price;
      } else {
        action.payload.quantity = 1;
        action.payload.totalPrice = action.payload.price;
        state.push(action.payload);
      }
    },
    decrement: (state, action) => {
      console.log(action.payload);
      const filterData = state?.filter((item) => item._id !== action.payload);
      return filterData;
    },
    resetCart: () => {
      return [];
    },
  },
});
export const { increment, decrement, resetCart } = addCartSlice.actions;
export default addCartSlice.reducer;
