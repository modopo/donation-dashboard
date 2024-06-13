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
  tagTypes: [
    "User",
    "Register",
    "Login",
    "BankData",
    "Donor",
    "RecordedDonations",
    "AllDonations",
  ],
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
      query: (userId) => `user/${userId}`,
      providesTags: ["User"],
    }),
    getBankData: build.query({
      query: ({ userId, bank }) => {
        return `general/${userId}/${bank}`;
      },
      providesTags: ["BankData"],
    }),
    getDonor: build.query({
      query: ({ userId, donator }) => ({
        url: `donations/${userId}/donator`,
        method: "GET",
        body: donator,
      }),
      providesTags: ["Donor"],
    }),
    getUserRecordedDonations: build.query({
      query: (userId) => `donations/${userId}`,
      providesTags: ["RecordedDonations"],
    }),
    getAllDonations: build.query({
      query: (userId) => `donations/${userId}/allDonations`,
      providesTags: ["AllDonations"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetBankDataQuery,
  useGetDonorQuery,
  useGetUserRecordedDonationsQuery,
  useGetAllDonationsQuery,
} = api;
