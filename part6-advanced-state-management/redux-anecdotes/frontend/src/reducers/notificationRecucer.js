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

export const setNotification = (content, timeout) => {
  // * timeout is provided in seconds
  return (dispatch) => {
    dispatch(notificationSet(content));
    setTimeout(notificationRemove, timeout * 1000);
  };
};

export default notificationSlice.reducer;
