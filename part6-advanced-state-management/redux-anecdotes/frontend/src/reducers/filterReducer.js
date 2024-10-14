import { createSlice } from "@reduxjs/toolkit";
// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange: (state, action) => action.payload,
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
