import {  createSlice, current } from "@reduxjs/toolkit";

const initialState= {
  todoItems: [],
  countTodo: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToList: (state: any, action) => {
        const { todoTitle, todoDesc } = action.payload;
        const currentDate = new Date();
        const year = currentDate.getFullYear()
        const month = currentDate.getUTCMonth()
        const day = currentDate.getDay()
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const currentLocalTime = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute} ${day}-${month}-${year}`;
        const data = new Array();
        data.push({
        todoTitle:todoTitle,
        todoDesc:todoDesc,
        todoCreatedAt:currentLocalTime
       })
       state.todoItems = [...state.todoItems,data[0]]
       state.countTodo = state.countTodo + 1
      },
    clearList: (state: any) => {
      state.todoItems = [];
      state.countTodo = 0;
    },
    removeFromList: (state: any, action) => {
      state.todoItems = state.todoItems.filter(
        (e: any) => e.todoTitle !== action.payload
      );
      state.countTodo = state.countTodo - 1;
    },

  },
});
export const { addToList,clearList,removeFromList} = todoSlice.actions;
export default todoSlice.reducer;
