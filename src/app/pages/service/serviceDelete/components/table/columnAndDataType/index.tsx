import { ColumnsType } from "antd/es/table";
import {
	isAllowApproveServiceDelete,
	isAllowDeleteServiceDelete,
	isAllowRejectServiceDelete,
	isAllowUpdateServiceDelete,
} from "app/helper/permission";
import { IServiceDelete } from "store/types/serviceDeleteTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string;
		}>
	>;
	handleDelete: (id: string) => void;
	handleApprove: (id: string) => void;
	handleReject: (id: string) => void;
}

export const columns = ({
	setShowModal,
	handleDelete,
	handleApprove,
	handleReject,
}: IColumn) => {
	const columnType: ColumnsType<IServiceDelete> = [
		{
			title: "Tanggal",
			dataIndex: "date",
			sorter: true,
		},
		{
			title: "Inventory",
			dataIndex: "id_inventory",
			sorter: true,
		},
		{
			title: "Alasan",
			dataIndex: "reason",
			sorter: true,
		},
		{
			title: "Remark",
			dataIndex: "remark",
			sorter: true,
		},
		{
			title: "Perusahaan",
			dataIndex: "id_company",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{isAllowApproveServiceDelete && (
							<button
								type="button"
								className="btn btn-success"
								onClick={() => {
									handleApprove(text);
								}}
							>
								Approve
							</button>
						)}
						{isAllowRejectServiceDelete && (
							<button
								type="button"
								className="btn"
								style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
								onClick={() => {
									handleReject(text);
								}}
							>
								Reject
							</button>
						)}
						{isAllowUpdateServiceDelete && (
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									setShowModal({ show: true, id: text });
								}}
							>
								Edit
							</button>
						)}
						{isAllowDeleteServiceDelete && (
							<button
								type="button"
								className="btn"
								style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
								onClick={() => {
									handleDelete(text);
								}}
							>
								Delete
							</button>
						)}
					</div>
				);
			},
		},
	];
	return columnType;
};
