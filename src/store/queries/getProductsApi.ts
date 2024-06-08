import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProductTypes, IResProducts } from "../../interfaces";

export const queryProductsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
    cache: "default",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IResProducts, string | void>({
      query: () => `/products?populate=category,image`,
    }),
    getProductDetailsApi: builder.query<{data:IProductTypes | undefined}, string | void>({
      query: (id: string) => `/products/${id}?populate=category,image`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsApiQuery } =
  queryProductsApi;
