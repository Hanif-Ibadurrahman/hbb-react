import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
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
						{listCheckPermission.isAllowApproveServicePenghapusan && (
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
						{listCheckPermission.isAllowRejectServicePenghapusan && (
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
						{listCheckPermission.isAllowUpdateServicePenghapusan && (
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
						{listCheckPermission.isAllowDeleteServicePenghapusan && (
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
