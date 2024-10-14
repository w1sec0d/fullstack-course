import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Hello! Welcome to Anecdote App",
  reducers: {
    notificationSet: (state, action) => action.payload,
    notificationRemove: () => "",
  },
});

export const { notificationRemove, notificationSet } =
  notificationSlice.actions;
export default notificationSlice.reducer;
