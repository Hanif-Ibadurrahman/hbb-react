import { ColumnsType } from "antd/es/table";
import { IServiceTicketHistory } from "store/types/serviceTicketHistoryTypes";

interface IColumn {
	setShowModalDetail: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
}

export const columns = ({ setShowModalDetail }: IColumn) => {
	const columnType: ColumnsType<IServiceTicketHistory> = [
		{
			title: "No Transaksi",
			dataIndex: "no_urut",
			sorter: true,
		},
		{
			title: "Tipe Transaksi",
			dataIndex: "type",
			sorter: true,
			render: (text, record, index) => {
				return text?.toUpperCase();
			},
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
							onClick={() => {
								setShowModalDetail({ show: true, id: text });
							}}
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
