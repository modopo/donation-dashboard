import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useSelector } from "react-redux";
import { useGetBankDataQuery } from "state/api";

const Item = ({ _id, name, quantity }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {Number(quantity)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See Notes
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>id: {_id}</Typography>
          <Typography>id: {_id}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const BankSelect = ({ onBankSelect }) => {
  const [selected, setSelected] = useState("Food");
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelected(selectedValue);
    onBankSelect(selectedValue);
  };

  return (
    <Box m="1rem">
      <FormControl fullWidth>
        <InputLabel id="bank-label">Bank Type</InputLabel>
        <Select
          labelId="bank-label"
          id="bank-select"
          value={selected}
          label="Bank"
          onChange={handleChange}
        >
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Items"}>Items</MenuItem>
          <MenuItem value={"Money"}>Cash</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const Banks = () => {
  const [bank, setBank] = useState("Food");
  const userId = useSelector((state) => state.global.user);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const handleBankSelect = (selectedBank) => {
    setBank(selectedBank);
  };

  const { data, isLoading } = useGetBankDataQuery({ userId, bank });

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Banks" subtitle="See list of quantity in bank. " />
      <BankSelect onBankSelect={handleBankSelect} />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(({ _id, name, quantity }) => (
            <Item key={_id} _id={_id} name={name} quantity={quantity} />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Banks;
