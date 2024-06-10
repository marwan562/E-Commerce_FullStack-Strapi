import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResProducts } from "../../interfaces";
import { RootState } from "..";

export const productsDashboard = createApi({
  reducerPath: "productsDashboard",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.userData?.jwt;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    productDashboard: build.query<IResProducts | undefined,number>({
      query: (page) =>
        `/products?populate=image,category&pagination[page]=${page}&pagination[pageSize]=6`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }:{id:number}) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    removeProduct: build.mutation<IResProducts, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useProductDashboardQuery, useRemoveProductMutation } =
  productsDashboard;
