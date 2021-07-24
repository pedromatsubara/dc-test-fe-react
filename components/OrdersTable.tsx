import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from "@material-ui/core";

import { AppContext } from "../lib/AppContextProvider";
import { sort, sorter, TableOrder, TableHeader } from "./TableHeader"
import Order from "../model/order/Order";
import classes from "../components/ordersTable.module.css";

export default function OrdersTable() {
	const router = useRouter();
	const orders = useContext(AppContext);
	const [order, setOrder] = useState<TableOrder>("desc");
	const [orderBy, setOrderBy] = useState<keyof Order>("date");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const orderedOrders = sort(orders, order === "asc" ? (a, b) => sorter(b, a, orderBy) : (a, b) => sorter(a, b, orderBy));
	const filteredOrders = orderedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	const emptyRows = rowsPerPage -	Math.min(rowsPerPage, orders.length - page * rowsPerPage);

	const handleChangePage = (event: any, newPage: number) => setPage(newPage);
	const handleSort = (property: keyof Order) => {
		setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
		setOrderBy(property);
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div className={classes.root}>
			<Paper>
				<TableContainer>
					<Table>
						<TableHeader
							order={order}
							orderBy={orderBy}
							onSort={handleSort}
						/>
						<TableBody>
							{filteredOrders.map((order) => {
								const date = new Date(order.date).toLocaleDateString().slice(0, 5);
								const time = new Date(order.date).toLocaleTimeString().slice(0, 5);

								return (
									<TableRow onClick={() => router.push("orders/" + order._id)} key={order._id} hover>
										<TableCell id={order._id}>{order.store}</TableCell>
										<TableCell>{order.client}</TableCell>
										<TableCell>{time} {date}</TableCell>
										<TableCell>R$ {order.debt.toFixed(2)}</TableCell>
										<TableCell>R$ {order.total.toFixed(2)}</TableCell>
										<TableCell>{order._id}</TableCell>
									</TableRow>
								)})
							}
							<TableRow className={emptyRows > 0 ? "" : "hide"} style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10]}
					component="div"
					count={orders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
