import { baseApi } from "../../Apis/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.map((item) => params.append(item.name, item.value));
        }
        return {
          url: "/product/getProduct",
          method: "GET",
          params: params,
        };
      },
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/create-product",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } =
  productManagementApi;
