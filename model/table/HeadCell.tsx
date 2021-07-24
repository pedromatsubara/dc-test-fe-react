import Order from "../order/Order";

export default interface HeadCell {
	id: keyof Order;
	label: string;
	hideable: boolean;
}