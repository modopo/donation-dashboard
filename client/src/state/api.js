import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Register", "Login", "Food", "Items", "Money"],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      providesTags: ["Register"],
    }),
    loginUser: build.mutation({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
      providesTags: ["Login"],
    }),
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    getFood: build.query({
      query: (id) => `general/${id}/food`,
      providesTags: ["Food"],
    }),
    getItems: build.query({
      query: (id) => `general/${id}/items`,
      providesTags: ["Items"],
    }),
    getMoney: build.query({
      query: (id) => `general/${id}/money`,
      providesTags: ["Money"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetFoodQuery,
  useGetItemsQuery,
  useGetMoneyQuery,
} = api;
