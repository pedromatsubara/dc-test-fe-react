import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, TextField } from "@material-ui/core";

import { AppContext } from "../lib/AppContextProvider";
import { sort, sorter, TableOrder, TableHeader } from "./TableHeader"
import Order from "../model/order/Order";
import classes from "../components/ordersTable.module.css";

const filterBySearch = (filter: string, orders: Order[]) => {
	if (filter === "") return orders;
	return orders.filter(order => JSON.stringify(Object.values(order).join()).toLowerCase().indexOf(filter) !== -1);
}

export default function OrdersTable() {
	const router = useRouter();
	const orders = useContext(AppContext);
	const [order, setOrder] = useState<TableOrder>("desc");
	const [orderBy, setOrderBy] = useState<keyof Order>("date");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filter, setFilter] = useState("");

	const orderedOrders = sort(orders, order === "asc" ? (a, b) => sorter(b, a, orderBy) : (a, b) => sorter(a, b, orderBy));
	const filteredOrders = filterBySearch(filter, orderedOrders);
	const emptyRows = rowsPerPage -	Math.min(rowsPerPage, filteredOrders.length - page * rowsPerPage);

	const handleChangePage = (event: any, newPage: number) => setPage(newPage);

	const handleSort = (property: keyof Order) => {
		setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
		setOrderBy(property);
	}
	const handlefilter = (event: any) => {
		setFilter(event.target.value);
		setPage(0);
	}
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	return (
		<div className={classes.root}>
			<Paper>
				<TextField label="Busca geral" type="search" onChange={(event) => handlefilter(event)} />
				<TableContainer>
					<Table>
						<TableHeader
							order={order}
							orderBy={orderBy}
							onSort={handleSort}
						/>
						<TableBody>
							{filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
								return <TableRow 
										onClick={() => router.push("orders/" + order._id)}
										key={order._id}
										style={index % 2 === 0 ? {backgroundColor: "#fed4cb"} : {}}
										hover>
									<TableCell id={order._id}>{order.store}</TableCell>
									<TableCell>{order.client}</TableCell>
									<TableCell>{order.time} {order.day}</TableCell>
									<TableCell>R$ {order.debt.toFixed(2)}</TableCell>
									<TableCell>R$ {order.total.toFixed(2)}</TableCell>
									<TableCell>{order._id}</TableCell>
								</TableRow>
							})}
							<TableRow className={emptyRows > 0 ? "" : "hide"} style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component="div"
					className={classes.cell}
					rowsPerPageOptions={[5, 10]}
					count={filteredOrders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
