import { createContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "./graphql/getOrders";
import Order from "../model/order/Order";

// temporary helper function (mock)
function updatedOrders(orders: Order[]) {
  const dateNow = new Date().getTime();
  return orders.map((order) => {
    const updatedOrder: Order = Object.assign({}, order);
    updatedOrder.client = order.customer.name;
    updatedOrder.total = (order.amount + order.deliveryFee) / 100;
    updatedOrder.debt = (order.amount + order.deliveryFee - order.payments[0].amount) / 100;
    updatedOrder.date = dateNow - order.reference * order.deliveryFee;
    updatedOrder.amount = order.amount / 100;
    updatedOrder.deliveryFee = order.deliveryFee / 100;

    const fakePastDate = new Date(updatedOrder.date);
    updatedOrder.day = fakePastDate.toLocaleDateString().slice(0, 5);
    updatedOrder.time = fakePastDate.toLocaleTimeString().slice(0, 5);
    return updatedOrder;
  });
}

export const AppContext = createContext<Order[]>([]);

export default function AppContextProvider({ children }: any) {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Oops! Algo deu errado ${error.message}</p>;
  if (!data.orders || data.orders.length === 0) return <p>Lista de pedidos vazia!</p>;

  const orders: Order[] = updatedOrders(data.orders);

  return <AppContext.Provider value={orders}>{children}</AppContext.Provider>;
}
