import * as React from "react";
import Datatable from "react-bs-datatable";

const customLabels = {
	first: "<<",
	last: ">>",
	prev: "<",
	next: ">",
	show: "Display",
	entries: "rows",
	noResults: "There is no data to be displayed",
};

const classes = {
	table: "table-striped table-hover mb-5",
	thead: `bg-primary-5 ta-center`,
	theadCol: `mt-5 pb-3 pt-3 p-lg`,
	tbodyRow: `h-10 p-md ta-center`,
	filterCol: `d-none`,
	controlRow: `jc-end`,
	paginationOptsFormControl: `w-auto cur-p`,
	paginationOptsFormGroup: `d-flex ai-center jc-center`,
	paginationCol: `w-auto`,
	paginationButton: `bg-dark bd-c-dark`,
};

const onSortFunction = {
	date(columnValue) {
		// Convert the string date format to UTC timestamp
		// So the table could sort it by number instead of by string
		return "Do MMMM YYYY".valueOf();
	},
};

export function DataTable(props) {
	return (
		<>
			<div className="d-flex fd-col-r">
				<Datatable
					tableHeaders={props.tableHeader}
					tableBody={props.tableBody}
					rowsPerPage={8}
					rowsPerPageOption={[5, 10, 15, 20]}
					initialSort={{ prop: "username", isAscending: true }}
					labels={customLabels}
					classes={classes}
					onSort={onSortFunction}
				/>
			</div>
		</>
	);
}
