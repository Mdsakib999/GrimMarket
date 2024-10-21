import { baseApi } from "../../Apis/baseApi";

const postApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (data) => {
        return {
          url: "/post/create-post",
          method: "POST",
          body: data, // Send data in the request body
        };
      },
    }),
    updatePost: build.mutation({
      query: ({ payload, id }) => {
        console.log(payload);
        console.log(id);
        return {
          url: `/post/update-post/${id}`,
          method: "PATCH",
          body: payload, // Send data in the request body
        };
      },
    }),
    deletePost: build.mutation({
      query: (id) => {
        return {
          url: `/post/${id}`,
          method: "DELETE",
        };
      },
    }),
    getPost: build.query({
      query: (data) => {
        return {
          url: "/post/getPost",
          method: "GET",
          body: data, // Send data in the request body
        };
      },
    }),
  }),
});
export const {
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApis;
