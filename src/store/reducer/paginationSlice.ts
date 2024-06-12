import { createSlice } from "@reduxjs/toolkit";

interface IState {
  page: number;
  pageSize: number;
  created_At: "asc" | "desc";
}

const initialState: IState = {
  page: 1,
  pageSize: 10,
  created_At: "asc",
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
    getPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    getCreatedAt: (state, action) => {
      state.created_At = action.payload;
    },
    cleanPage: (state) => {
      state.page = 1;
      state.pageSize = 10;
      state.created_At = "asc";
    },
  },
});

export const { lastPage, nextPage, cleanPage, getPage, getPageSize , getCreatedAt} =
  paginationSlice.actions;
export default paginationSlice.reducer;
