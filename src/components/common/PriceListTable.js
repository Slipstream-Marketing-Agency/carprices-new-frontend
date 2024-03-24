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
import { useRouter } from "next/router";
import useTranslate from "@/src/utils/useTranslate";

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
  const router = useRouter();
  const t = useTranslate();
  const isRtl = router.locale === "ar";

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 0, fontFamily: "Gilroy" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t.modelName}</StyledTableCell>
            <StyledTableCell>{t.priceList}</StyledTableCell>
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
