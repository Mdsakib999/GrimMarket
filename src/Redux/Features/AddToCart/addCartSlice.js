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
      const filterData = state?.filter((item) => item._id !== action.payload);
      return filterData;
    },
    resetCart: () => {
      return [];
    },
    quantityIncrement: (state, action) => {
      const isExist = state.find((item) => item._id == action.payload);
      isExist.quantity = isExist.quantity + 1;
      isExist.totalPrice = isExist.quantity * isExist.price;
    },
    quantityDecrement: (state, action) => {
      // Find the existing item in the cart
      const isExist = state.find((item) => item._id === action.payload);

      if (isExist && isExist.quantity > 0) {
        // Decrease quantity by 1
        isExist.quantity -= 1;
        // Update total price based on the new quantity
        isExist.totalPrice = isExist.quantity * isExist.price;

        // If quantity reaches 0, remove the item from the cart
      }
      if (isExist.quantity === 0) {
        return state.filter((item) => item._id !== action.payload);
      }

      // Return the updated state
      return state;
    },
  },
});
export const {
  increment,
  decrement,
  resetCart,
  quantityIncrement,
  quantityDecrement,
} = addCartSlice.actions;
export default addCartSlice.reducer;
