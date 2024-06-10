import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetDonorQuery } from "../../state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Donors = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetDonorQuery();
  console.log("data:", data);
  return <div>Donors</div>;
};

export default Donors;
