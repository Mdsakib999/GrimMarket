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
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),
    userPasswordChange: build.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserPasswordChangeMutation,
} = authApi;
