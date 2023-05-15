import { ColumnsType } from "antd/es/table";
import { IServiceTicketHistory } from "store/types/serviceTicketHistoryTypes";

export const columns = () => {
	const columnType: ColumnsType<IServiceTicketHistory> = [
		{
			title: "Nomor",
			dataIndex: "id",
			sorter: true,
		},
		{
			title: "Tipe",
			dataIndex: "type",
			sorter: true,
		},
		{
			title: "Oleh",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Tanggal",
			dataIndex: "created_at",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => {}}
						>
							Detail
						</button>
					</div>
				);
			},
		},
	];
	return columnType;
};
