import { Pagination, PaginationProps, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PaginationState } from "store/types/paginationTypes";
interface ITableSelectionPaginateAndSort {
	title?: string;
	subTitle?: string;
	rowKey: string;
	columns: ColumnsType<any>;
	dataSource?: PaginationState;
	contentHeader?: JSX.Element;
	setSelectedRow: Dispatch<SetStateAction<any[]>>;
	setSelectedPageAndSort: React.Dispatch<
		React.SetStateAction<
			| {
					page?: number | undefined;
					per_page?: number | undefined;
					sort?: string | undefined;
					order_by?: string | undefined;
			  }
			| undefined
		>
	>;
	scroll?: {
		x?: string | number | true;
		y?: string | number;
	};
}

export const TableSelectionPaginateAndSort = ({
	title,
	subTitle,
	rowKey,
	columns,
	dataSource,
	contentHeader,
	setSelectedRow,
	setSelectedPageAndSort,
	scroll,
}: ITableSelectionPaginateAndSort) => {
	const [data, setData] = useState<any>([]);
	const [pagination, setPagination] = useState<PaginationProps>();

	useEffect(() => {
		if (dataSource) {
			setData(dataSource.data);
			setPagination({
				current: dataSource.current_page,
				pageSize: dataSource.per_page,
				total: dataSource.total,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataSource]);

	const handleTable = sorter => {
		setSelectedPageAndSort({
			page: pagination?.current,
			per_page: pagination?.pageSize,
			order_by: sorter.field,
			sort: sorter.order,
		});
	};

	const handlePaginate = (page: number, pageSize: number) => {
		setSelectedPageAndSort({ page: page, per_page: pageSize });
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
					<div style={{ display: "flex", columnGap: 5 }}>
						<button
							className="btn btn-secondary"
							data-bs-toggle="modal"
							data-bs-target="#modal-side"
						>
							<i className="fa fa-filter">Filter</i>
						</button>
						{contentHeader}
					</div>
				</div>
				<div className="table-responsive">
					<Table
						rowKey={rowKey}
						columns={columns}
						rowSelection={{
							type: "checkbox",
							onChange: (selectedRowKeys, selectedRows) => {
								setSelectedRow(selectedRows);
							},
						}}
						dataSource={data}
						pagination={false}
						scroll={scroll}
						onChange={(pagination, filters, sorter, extra) => {
							handleTable(sorter);
						}}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "end",
							marginTop: 20,
						}}
					>
						<Pagination {...pagination} onChange={handlePaginate}></Pagination>
					</div>
				</div>
			</div>
		</div>
	);
};
