import Address from "./Address";
import Customer from "./Customer";
import Item from "./Item";
import Payment from "./Payment";

export default interface Order {
	_id: string;
	store: string;
	amount: number;
	deliveryFee: number;
	customer: Customer | any;
	payments: Payment[];
	items: Item[];
	address: Address;
	debt: number;
	date: number;
	day: string;
	time: string;
	total: number;
	client: string;
	reference: number;
}
