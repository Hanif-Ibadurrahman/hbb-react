import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IServiceRequest } from "store/types/serviceRequestTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
	handleDelete: (id: string) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IServiceRequest> = [
		{
			title: "No HBB/Inventaris",
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
								setShowModal({ show: true, id: text });
							}}
						>
							Approve
						</button>
						<button
							type="button"
							className="btn"
							style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
							onClick={() => {
								if (handleDelete) {
									handleDelete(text);
								}
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
