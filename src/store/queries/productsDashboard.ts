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
    //GET
    productDashboard: build.query<IResProducts | undefined, {page:number , pageSize:number}>({
      query: ({page ,pageSize}) =>
        `/products?populate=image,category&pagination[page]=${page}&pagination[pageSize]=${pageSize}&createdAt:desc`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({
                type: "Products",
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // PUT
    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: body,
      }),

      invalidatesTags: [{ type: "Products", id: "LIST" }],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsDashboard.util.updateQueryData(
            "productDashboard",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // POST
    createProduct: build.mutation({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // DELETE
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
export const {
  useProductDashboardQuery,
  useRemoveProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsDashboard;
