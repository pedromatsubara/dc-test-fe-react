import { Order } from "../Order";
import { TableOrder } from "../../../components/TableHeader";

export interface TableHeaderProps {
  onSort: (property: keyof Order) => void;
  order: TableOrder;
  orderBy: string;
}
