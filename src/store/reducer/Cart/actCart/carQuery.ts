import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProductTypes } from "../../../../interfaces";
import { RootState } from "../../..";

export const queryCartsApi = createApi({
  reducerPath: "carts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
    cache: "default",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.userData?.jwt;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCart: builder.query({
      query: (email: string | undefined) => ({
        url: `/carts?populate[products][populate]=image,category&filters[email][$eq]=${email}`,
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({
        data,
      }: {
        data: {
          title: string | undefined;
          email: string | undefined;
          products: IProductTypes;
        };
      }) => ({
        url: `/carts`,
        method: "POST",
        body: {
          data,
        },
      }),
    }),
    incrementQty: builder.mutation({
      query: ({
        cartId,
        productId,
        quantity,
      }: {
        cartId: string;
        productId: string;
        quantity: number; // Change the type to number
      }) => ({
        url: `/carts/${cartId}?populate[products][populate]=image,category`,
        method: "PUT",
        body: {
          data: {
            products: {
              data: [
                {
                  id: productId,
                  attributes: {
                    quantity: quantity,
                  },
                },
              ],
            },
          },
        },
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useIncrementQtyMutation,
} = queryCartsApi;
