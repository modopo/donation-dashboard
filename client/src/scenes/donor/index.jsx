import React from "react";
import { useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import {
  useGetUserRecordedDonationsQuery,
  useGetDonorQuery,
  useGetAllDonationsQuery,
} from "../../state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Donors = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.user);
  const { data, isLoading } = useGetAllDonationsQuery(userId);
  console.log("data: ", data);

  const columns = [
    {
      field: "donorName",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 0.75,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "donation",
      headerName: "Donations",
      flex: 0.5,
      valueGetter: (params) => params.value.length,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DONORS" subtitle="List of Donators" />
      <Box>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Donors;
