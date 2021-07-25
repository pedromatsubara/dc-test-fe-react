import React from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../lib/AppContextProvider";

import OrderDetails from "../../components/OrderDetails";

export default function OrderDetailPage() {
  const router = useRouter();
  const orders = useContext(AppContext);
  const order = orders.find((order) => order._id === router.query.order_id);

  if (!order) return "Not found!";

  return (
    <OrderDetails order={order} />
  );
}
