import Order from "../order/Order";
import { TableOrder } from "../../lib/helper/table/header";

export default interface TableHeaderProps {
	onSort: (property: keyof Order) => void;
	order: TableOrder;
	orderBy: string;
}
