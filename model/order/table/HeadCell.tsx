import Order from "../Order";

export default interface HeadCell {
	id: keyof Order;
	label: string;
	hideable: boolean;
}