import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IServiceInspection } from "store/types/serviceInspectionTypes";

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
	handleShowFile: (id: number) => void;
}

export const columns = ({
	setShowModal,
	handleDelete,
	handleApprove,
	handleReject,
	handleShowFile,
}: IColumn) => {
	const columnType: ColumnsType<IServiceInspection> = [
		{
			title: "Kode Inventaris",
			dataIndex: "inventory_code",
			sorter: true,
		},
		{
			title: "Deskripsi",
			dataIndex: "description",
			sorter: true,
		},
		{
			title: "Foto",
			sorter: true,
			render: (text, record, index) => {
				return record.attachment_file ? (
					<Button
						type="link"
						onClick={() => {
							handleShowFile(record.id);
						}}
					>
						Show
					</Button>
				) : (
					"Tidak ada"
				);
			},
		},
		{
			title: "Nama Pegawai",
			dataIndex: "emp_name",
			sorter: true,
		},
		{
			title: "Kondisi",
			dataIndex: "condition",
			sorter: true,
		},
		{
			title: "Spesifikasi",
			dataIndex: "spesification",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowApproveServicePemeriksaan && (
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
						{listCheckPermission.isAllowRejectServicePemeriksaan && (
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
						{listCheckPermission.isAllowUpdateServicePemeriksaan && (
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
						{listCheckPermission.isAllowDeleteServicePemeriksaan && (
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