import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Hello! Welcome to Anecdote App",
  reducers: {
    notificationChange: (state, action) => action.payload,
  },
});

export default notificationSlice.reducer;
