import { Button, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";

interface ITablePaginate {
	title?: string;
	subTitle?: string;
	columns: ColumnsType<any>;
	dataSource?: PaginationState;
	setSelectedPage: Dispatch<SetStateAction<number>>;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
}

export const TablePaginateAndSort = ({
	title,
	subTitle,
	columns,
	dataSource,
	setSelectedPage,
}: ITablePaginate) => {
	const [data, setData] = useState<any>([]);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: data,
			pageSize: 10,
		},
	});

	useEffect(() => {
		if (dataSource) {
			setData(dataSource.data);
			setTableParams({
				pagination: {
					total: dataSource.total,
					current: dataSource.current_page,
					pageSize: dataSource.last_page ?? undefined,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSource]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		sorter: SorterResult<any>,
	) => {
		setTableParams({
			pagination,
			...sorter,
		});

		if (
			pagination.pageSize &&
			pagination.pageSize !== tableParams.pagination?.pageSize
		) {
			setData([]);
			setSelectedPage(pagination.pageSize);
		}
	};

	return (
		<div className="box">
			<div className="box-header with-border">
				<h3 className="box-title">{title}</h3>
				<h6 className="box-subtitle">{subTitle}</h6>
			</div>
			<div className="box-body">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "1em",
					}}
				>
					<div className="btn-group">
						<button className="btn btn-secondary">Excel</button>
						<button className="btn btn-secondary">PDF</button>
					</div>
					<button
						type="button"
						className="btn btn-secondary"
						data-bs-toggle="modal"
						data-bs-target="#modal-side"
					>
						<i className="fa fa-filter">Filter</i>
					</button>
				</div>
				<div className="table-responsive">
					<Table
						columns={columns}
						dataSource={data}
						onChange={handleTableChange}
					/>
				</div>
			</div>
		</div>
	);
};
