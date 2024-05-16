import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typograpny,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetFoodQuery, useGetItemsQuery, useGetMoneyQuery } from "state/api";

const Banks = () => {
  return (
    <Box>
      <Header title="Banks" subtitle="See list of quantity in bank" />
    </Box>
  );
};

export default Banks;
