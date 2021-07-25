import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import styled from "styled-components";

import { Order } from "../model/order/Order";
import { HeadCell } from "../model/order/table/HeadCell";
import { TableHeaderProps } from "../model/order/table/TableHeaderProps";

const ModifiedTableHead = styled(TableHead)`
  background-color: #d47855;
`;

const TableSort = styled(TableSortLabel)`
  span,
  svg {
    color: #fdf9f9 !important;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export type TableOrder = "asc" | "desc";

const castString = (str: any) => str.toLowerCase();

export function sorter<T>(a: T, b: T, orderBy: keyof T) {
  if (typeof a[orderBy] === "number") {
    return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;
  }

  if (castString(b[orderBy]) < castString(a[orderBy])) return -1;
  if (castString(b[orderBy]) > castString(a[orderBy])) return 1;
  return 0;
}

export function sort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const headCells: HeadCell[] = [
  { id: "store", label: "Lojista", hideable: true },
  { id: "client", label: "Cliente", hideable: false },
  { id: "date", label: "Data", hideable: false },
  { id: "debt", label: "Pendência", hideable: true },
  { id: "total", label: "Total", hideable: false },
  { id: "_id", label: "#ID do Pedido", hideable: true },
];

export function TableHeader(props: TableHeaderProps) {
  const { order, orderBy, onSort } = props;
  const createSortHandler = (property: keyof Order) => () => onSort(property);

  return (
    <ModifiedTableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSort
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <span>{headCell.label}</span>
            </TableSort>
          </TableCell>
        ))}
      </TableRow>
    </ModifiedTableHead>
  );
}
