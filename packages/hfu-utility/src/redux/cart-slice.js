import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  showCart: false,
};

const cartSlice = createSlice({
  name: "authentication",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload.id);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item !== action.payload.id);
    },
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
