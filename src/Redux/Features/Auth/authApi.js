import { baseApi } from "../../Apis/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (data) => ({
        url: "/user/login-user",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return {
          token: response.data.token,
          message: response.message,
        };
      },
    }),
    userRegister: build.mutation({
      query: (data) => {
        return {
          url: "/user/create-user",
          method: "POST",
          body: data, // Send data in the request body
        };
      },
    }),

    userPasswordChange: build.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getMe: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),
    getAllUsers: build.query({
      query: () => ({
        url: "/user/allUsers",
        method: "GET",
      }),
    }),
    deleteAUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserPasswordChangeMutation,
  useGetMeQuery,
  useGetAllUsersQuery,
  useDeleteAUserMutation,
} = authApi;
