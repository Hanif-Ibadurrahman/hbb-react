import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IServiceDisplacement } from "store/types/serviceDisplacementTypes";
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
	const columnType: ColumnsType<IServiceDisplacement> = [
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
			title: "Dari User",
			dataIndex: "from_user",
			sorter: true,
		},
		{
			title: "Untuk User",
			dataIndex: "to_user",
			sorter: true,
		},
		{
			title: "Perusahaan",
			dataIndex: "id_company",
			sorter: true,
		},
		{
			title: "Lokasi",
			dataIndex: "id_lokasi",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowApproveServicePemindahan && (
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
						{listCheckPermission.isAllowRejectServicePemindahan && (
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
						{listCheckPermission.isAllowUpdateServicePemindahan && (
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
						{listCheckPermission.isAllowDeleteServicePemindahan && (
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
