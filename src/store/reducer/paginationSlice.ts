import { createSlice } from "@reduxjs/toolkit";

interface IState {
  page: number;
  pageSize: number;
}

const initialState: IState = {
  page: 1,
  pageSize: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    getPage: (state, action) => {
      state.page = action.payload;
    },
    lastPage: (state) => {
      state.page = state.page - 1;
    },
    getPageSize: (state , action) => {
      state.pageSize = action.payload
    },
    cleanPage: (state) => {
      state.page = 1;
      state.pageSize = 10;
    },
  },
});

export const { lastPage, nextPage, cleanPage, getPage , getPageSize } =
  paginationSlice.actions;
export default paginationSlice.reducer;
