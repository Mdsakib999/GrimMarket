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
    getAllProducts: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        if (args) {
          args?.map((item) => params.append(item.name, item.value));
        }
        return {
          url: "/product/getAllProduct",
          method: "GET",
          params: params,
        };
      },
    }),
    editProduct: builder.mutation({
      query: ({ updateData, id }) => ({
        url: `/product/editProduct/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetAllProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = productManagementApi;
