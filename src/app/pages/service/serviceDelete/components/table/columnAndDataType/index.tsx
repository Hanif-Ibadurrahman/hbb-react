import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IServiceDelete } from "store/types/serviceDeleteTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
	handleApprove: (id: number) => void;
	handleReject: (id: number) => void;
}

export const columns = ({
	setShowModal,
	handleDelete,
	handleApprove,
	handleReject,
}: IColumn) => {
	const columnType: ColumnsType<IServiceDelete> = [
		{
			title: "No Transaksi",
			dataIndex: "id",
			align: "center",
			sorter: true,
		},
		{
			title: "Inventory",
			dataIndex: "inventory_name",
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
			title: "Tanggal",
			dataIndex: "date",
			sorter: true,
		},
		{
			title: "Perusahaan",
			dataIndex: "company_name",
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
