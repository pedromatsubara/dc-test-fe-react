import { useQuery } from "@apollo/client";

import GET_ORDERS from "../lib/graphql/allOrders";

function OrdersList() {
	const { loading, error, data } = useQuery(GET_ORDERS);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>Oops! Algo deu errado ${error.message}</p>;
	if (!data.orders) return <p>Lista de pedidos vazia!</p>;

	return (
		<ul>
			{data.orders.map((order: any) => {
				return <li key={order._id}>
					<p>Logista: {order.store}</p>
					<p>Cliente: {order.customer.name}</p>
					<p>Hora do pedido: {new Date().toLocaleString()}</p>
					<p>Total: {order.amount + order.deliveryFee}</p>
					<p>Valor Pendente: {order.amount + order.deliveryFee - order.payments[0].amount}</p>
				</li>;
			})}
		</ul>
	);
}

export default OrdersList;
