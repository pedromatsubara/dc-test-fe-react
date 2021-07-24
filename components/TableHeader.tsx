import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";

import Order from "../model/order/Order";
import HeadCell from "../model/table/HeadCell";
import TableHeaderProps from "../model/table/TableHeaderProps";

export type TableOrder = "asc" | "desc";

export function sorter<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) return -1;
	if (b[orderBy] > a[orderBy]) return 1;
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
	{ id: "debt", label: "Pendencia", hideable: true },
	{ id: "total", label: "Total", hideable: false },
	{ id: "_id", label: "#ID do Pedido", hideable: true },
];

export function TableHeader(props: TableHeaderProps) {
	const { order, orderBy, onSort } = props;
	const createSortHandler = (property: keyof Order) => () => onSort(property);

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
