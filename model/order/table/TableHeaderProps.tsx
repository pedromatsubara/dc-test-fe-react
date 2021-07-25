import Order from "../Order";
import { TableOrder } from "../../../components/TableHeader";

export default interface TableHeaderProps {
  onSort: (property: keyof Order) => void;
  order: TableOrder;
  orderBy: string;
}
