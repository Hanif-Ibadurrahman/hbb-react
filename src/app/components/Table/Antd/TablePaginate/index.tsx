import { Button, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PaginationState } from "store/Types/PaginationTypes";

interface ITablePaginate {
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
		<Table columns={columns} dataSource={data} onChange={handleTableChange} />
	);
};
