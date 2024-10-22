import { baseApi } from "../../Apis/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => {
        return {
          url: "/category/getAll-category",
          method: "GET",
        };
      },
    }),
    createCategory: build.mutation({
      query: (payload) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: payload,
        };
      },
    }),
    updateCategory: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteCategory: build.mutation({
      query: (id) => {
        return {
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        };
      },
    }),
    // sub category apis
    createSubCategory: build.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/category/create-subCategory/${id}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    deleteSubCategory: build.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/category/delete-subCategory/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),
  }),
});
export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = categoryApi;
