import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductTypes } from "../../../interfaces";
import { addToCart } from "../../../utils/addToCart";
import { decrementQuantity } from "../../../utils/decrementQuantityCart";

interface TState {
  cartItems: IProductTypes[];
}

const initialState: TState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (state, action: PayloadAction<IProductTypes>) => {
      state.cartItems = addToCart(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    decrementCartAction: (state, action) => {
      state.cartItems = decrementQuantity(state.cartItems, action.payload);
    },

    clearCartAction: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCartAction, clearCartAction, removeItemFromCart , decrementCartAction } =
  cartSlice.actions;
export default cartSlice.reducer;
