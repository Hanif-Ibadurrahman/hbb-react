import { ColumnsType } from "antd/es/table";
import { IServiceRequest } from "store/types/serviceRequestTypes";

interface IColumn {
	handleApprove: (id: string) => void;
	handleDelete: (id: string) => void;
}

export const columns = ({ handleApprove, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IServiceRequest> = [
		{
			title: "Nama Barang",
			dataIndex: "name_item",
			sorter: true,
		},
		{
			title: "Deskripsi",
			dataIndex: "description",
			sorter: true,
		},
		{
			title: "Foto",
			dataIndex: "photo",
			sorter: true,
		},
		{
			title: "Nama Pemakai",
			dataIndex: "user",
			sorter: true,
		},
		{
			title: "Kondisi",
			dataIndex: "condition",
			sorter: true,
		},
		{
			title: "Spesifikasi",
			dataIndex: "specification",
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
							className="btn btn-success"
							onClick={() => {
								handleApprove(text);
							}}
						>
							Approve
						</button>
						<button
							type="button"
							className="btn"
							style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
							onClick={() => {
								handleDelete(text);
							}}
						>
							Reject
						</button>
					</div>
				);
			},
		},
	];
	return columnType;
};
