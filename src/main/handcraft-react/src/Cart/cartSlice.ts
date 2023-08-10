import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  isLoadingCart: true,
  count: 0,
  hello: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state: any) => {
      state.cartItems = [];
      state.count = 0;
    },

    addToCart: (state: any, action) => {
      const { product, cartCount, cartColor } = action.payload;
      let data = state.cartItems;
      let isAdded = data.filter(
        (item: any) =>
          item.item.productId === product.productId && item.color === cartColor
      );
      if (isAdded.length === 0) {
        data.push({ item: product, count: cartCount, color: cartColor });
      } else {
        let addedData = data.filter(
          (item: any) =>
            item.item.productId === product.productId &&
            item.color === cartColor
        );
        let index = data.findIndex((i: any) => i === addedData[0]);
        data[index].count += cartCount;
      }
      state.count += cartCount;
    },

    removeItem: (state: any, action) => {
      const { productId, color, count } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: any) => item.item.productId !== productId || item.color !== color
      );
      state.count -= count;

    },

    calculateTotals: (state: any) => {
      let totalPrice = 0;
      state.cartItems.forEach((cartItem: any) => {
        if (cartItem.item.discount > 0) {
          totalPrice += cartItem.item.discountedPrice * cartItem.count;
        } else {
          totalPrice += cartItem.item.price * cartItem.count;
        }
      });

      state.total = totalPrice;
    },
  },
});
export const { clearCart, removeItem, calculateTotals, addToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
