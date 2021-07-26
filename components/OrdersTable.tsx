import { useContext, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  TextField,
} from "@material-ui/core";

import { AppContext } from "../lib/AppContextProvider";
import { sort, sorter, TableOrder, TableHeader } from "./TableHeader";
import { Order } from "../model/order/Order";

const PaperTable = styled(Paper)`
  max-width: 810px;
  margin: 0 auto;
`;

const TableSearch = styled(TextField)`
  width: 100%;
`;

const EvenOddRows = styled(TableRow)`
  :nth-child(odd) {
    background-color: #fed4cb;
  }
  :nth-child(even) {
    background-color: #fdf9f9;
  }
  :hover {
    cursor: pointer;
  }
`;

const TableFooter = styled.div`
  div,
  svg {
    background-color: #d47855;
    color: #fdf9f9;
  }
`;

const filterBySearch = (filter: string, orders: Order[]) => {
  if (filter === "") return orders;
  return orders.filter((order) => JSON.stringify(Object.values(order).join()).toLowerCase().indexOf(filter) !== -1);
};

export default function OrdersTable() {
  const router = useRouter();
  const orders = useContext(AppContext);
  const [order, setOrder] = useState<TableOrder>("desc");
  const [orderBy, setOrderBy] = useState<keyof Order>("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  const orderedOrders = sort(
    orders,
    order === "asc" ? (a, b) => sorter(b, a, orderBy) : (a, b) => sorter(a, b, orderBy),
  );
  const filteredOrders = filterBySearch(filter, orderedOrders);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredOrders.length - page * rowsPerPage);

  const handleChangePage = (event: any, newPage: number) => setPage(newPage);

  const handleSort = (property: keyof Order) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };
  const handlefilter = (event: any) => {
    setFilter(event.target.value);
    setPage(0);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PaperTable>
      <TableSearch label="Busca geral" type="search" onChange={(event) => handlefilter(event)} />
      <TableContainer>
        <Table>
          <TableHeader order={order} orderBy={orderBy} onSort={handleSort} />
          <TableBody>
            {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
              return (
                <EvenOddRows onClick={() => router.push("orders/" + order._id)} key={order._id}>
                  <TableCell id={order._id}>{order.store}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>
                    {order.time} {order.day}
                  </TableCell>
                  <TableCell>R$ {order.debt.toFixed(2)}</TableCell>
                  <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell>{order._id}</TableCell>
                </EvenOddRows>
              );
            })}
            <TableRow className={emptyRows > 0 ? "" : "hide"} style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component={TableFooter}
        rowsPerPageOptions={[5, 10]}
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PaperTable>
  );
}
