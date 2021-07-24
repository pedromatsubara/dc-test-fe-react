import { useState } from "react";
import { useQuery } from "@apollo/client";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { sort, sorter, TableOrder, TableHeader } from "../lib/helper/table/header"
import { GET_ORDERS } from "../lib/graphql/getOrders";
import Order from "../model/order/Order";
import classes from "../components/ordersTable.module.css";

// temporary helper function (mock)
function updatedOrders(orders: Order[]) {
	const dateNow = new Date().getTime();
	return orders.map((order) => {
		const updatedOrder: Order = Object.assign({}, order);
		updatedOrder.client = order.customer.name;
		updatedOrder.total = (order.amount + order.deliveryFee) / 100;
		updatedOrder.debt =	(order.amount + order.deliveryFee - order.payments[0].amount) / 100;
		updatedOrder.date = dateNow - order.reference * order.deliveryFee;
		return updatedOrder;
	});
}

export default function EnhancedTable() {
	const [order, setOrder] = useState<TableOrder>("desc");
	const [orderBy, setOrderBy] = useState<keyof Order>("date");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const { loading, error, data } = useQuery(GET_ORDERS);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>Oops! Algo deu errado ${error.message}</p>;
	if (!data.orders || data.orders.length === 0) return <p>Lista de pedidos vazia!</p>;

	const updatedData = updatedOrders(data.orders);
	const orderedOrders = sort(updatedData, order === "asc" ? (a, b) => sorter(b, a, orderBy) : (a, b) => sorter(a, b, orderBy));
	const filteredOrders = orderedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	const emptyRows = rowsPerPage -	Math.min(rowsPerPage, updatedData.length - page * rowsPerPage);

	
	const handleClick = (id: string) => console.log(id);
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
							{filteredOrders
								.map((order) => {
									const date = new Date(order.date).toLocaleDateString().slice(0, 5);
									const time = new Date(order.date).toLocaleTimeString().slice(0, 5);

									return (
										<TableRow
											hover
											onClick={() => handleClick(order._id)}
											key={order._id}
										>
											<TableCell id={order._id}>{order.store}</TableCell>
											<TableCell>{order.client}</TableCell>
											<TableCell>{time} {date}</TableCell>
											<TableCell>R$ {order.debt.toFixed(2)}</TableCell>
											<TableCell>R$ {order.total.toFixed(2)}</TableCell>
											<TableCell>{order._id}</TableCell>
										</TableRow>
									);
								})
							}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10]}
					component="div"
					count={updatedData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
