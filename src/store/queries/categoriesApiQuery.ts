import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategories } from "../../interfaces";

export const categoriesApiQuery = createApi({
  reducerPath: "categories",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  }),
  endpoints: (build) => ({
    getCategories: build.query<ICategories, string>({
      query: () => `/categories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiQuery;
