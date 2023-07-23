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
      const { productId, color,count } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: any) =>
          item.item.productId !== productId || item.color !== color
      );
      state.count -= count

      // const indexOfElem = state.cartItems.findIndex(
      //   (item: any) => item.item.productId === productId
      // );
      // let selectedItem = data.filter((item:any)=> item.item.productId === productId && item.color===color)
      // state.cartItems = data.filter((item:any)=>item !== selectedItem[0] && item.item.productId !==selectedItem[0].item.productId)
      // data.forEach((element:any) => {
      //   if(element.item.productId === productId && element.color === color){
      //     state.count-= element.count
      //   }
      // });
      // if(state.count > 0){
      //   // state.count -= removedCount;
      //   state.cartItems = state.cartItems.filter(
      //     (item: any, index: number) =>
      //     item.item.productId !== productId || index !== indexOfElem
      //     );
      // }else{
      //   state.count = 0
      // }
    },

    // cartItems = [{productId,n,p,...}]
    calculateTotals: (state: any) => {
      let totalPrice = 0;
      state.cartItems.forEach((cartItem: any) => {
        totalPrice += cartItem.item.price * cartItem.count;
      });

      state.total = totalPrice;
    },
  },
  // extraReducers:{
  //   [String(getCardItems.pending)]:(state:any)=>{
  //       state.isLoadingCart=true
  //   },
  //   [String(getCardItems.fulfilled)]:(state:any,action)=>{
  //       state.isLoadingCart=false;
  //       let count = 1
  //       if(state.cartItems[0].items.filter((x:ProductModel)=> x.productId))
  //       state.cartItems = [{
  //         items:action.payload,
  //         count:count
  //       }]
  //   },
  //   [String(getCardItems.rejected)]:(state:any)=>{
  //       state.isLoadingCart=true;
  //   }
  // }
});
export const { clearCart, removeItem, calculateTotals, addToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
