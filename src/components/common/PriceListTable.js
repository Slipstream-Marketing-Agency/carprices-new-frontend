import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Price from "@/src/utils/Price";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f9fa",
    color: theme.palette.common.black,
    fontWeight: "800",
    fontFamily: "Gilroy, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Gilroy, sans-serif",
  },
}));

// Update your component to accept the data prop
export default function PriceListTable({ data, brand }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 0, fontFamily: "Gilroy" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Model Name</StyledTableCell>
            <StyledTableCell>Price List</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((model) => (
            <TableRow key={model.modelSlug}>
              <StyledTableCell component="th" scope="row">
                {brand} {model.modelName}
              </StyledTableCell>
              <StyledTableCell>
                <Price data={model.minPrice.toLocaleString()} /> -{" "}
                {model.maxPrice.toLocaleString()}*
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
