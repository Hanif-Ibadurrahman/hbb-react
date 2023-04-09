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
	setSelectedPage: React.Dispatch<
		React.SetStateAction<{
			page: number;
			pageSize: number;
		}>
	>;
}

export const TableSelectionPaginateAndSort = ({
	title,
	subTitle,
	rowKey,
	columns,
	dataSource,
	contentHeader,
	setSelectedRow,
	setSelectedPage,
}: ITableSelectionPaginateAndSort) => {
	const [data, setData] = useState<any>([]);
	const [pagination, setPagination] = useState<PaginationProps>({
		current: 1,
		pageSize: 20,
	});

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

	const handlePaginate = (page: number, pageSize: number) => {
		setSelectedPage({ page: page, pageSize: pageSize });
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
						scroll={{ x: 2500, y: 600 }}
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
