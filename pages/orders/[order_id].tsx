import { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../lib/AppContextProvider";
import { Button } from "@material-ui/core";

export default function OrderDetailPage() {
	const router = useRouter();
	const orders = useContext(AppContext);
	const order = orders.find(order => order._id === router.query.order_id)
	console.log(order);
	
	return <Button onClick={() => router.back()}>Back</Button>
};
