import { Order } from "../Order";

export interface HeadCell {
  id: keyof Order;
  label: string;
  hideable: boolean;
}
