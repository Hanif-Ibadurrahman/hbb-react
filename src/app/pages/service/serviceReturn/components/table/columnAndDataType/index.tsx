import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { ITokenDecode } from "store/types/loginTypes";
import { IServiceReturn } from "store/types/serviceReturnTypes";

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
	tokenDecode?: ITokenDecode;
}

export const columns = ({
	setShowModal,
	handleDelete,
	handleApprove,
	handleReject,
	handleShowFile,
	tokenDecode,
}: IColumn) => {
	const columnType: ColumnsType<IServiceReturn> = [
		{
			title: "No Transaksi",
			dataIndex: "id",
			align: "center",
			sorter: true,
		},
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
			title: "Status",
			sorter: true,
			render: (text, record, index) => {
				const isNewAndNotApproved =
					record.current_flow === 1 && record.reject_status === null;
				const isFinished = record.is_closed_by !== null;
				const isRejected = record.reject_status !== null;
				if (isNewAndNotApproved) {
					return <Button type="primary">New</Button>;
				} else if (isFinished) {
					return (
						<Button type="primary" style={{ background: "#43d854" }}>
							Finish
						</Button>
					);
				} else if (isRejected) {
					return (
						<Button type="primary" danger>
							Reject
						</Button>
					);
				} else {
					return (
						<Button type="primary" style={{ background: "#fac13a" }}>
							Open
						</Button>
					);
				}
			},
		},
		{
			title: "Approve/Reject",
			sorter: true,
			render: (text, record, index) => {
				return record.pending_status || record.reject_status;
			},
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
				const isNewAndNotApproved =
					record.current_flow === 1 && record.reject_status === null;
				const isRejected = record.reject_status !== null;
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowApproveServicePengembalian &&
							record.current_approver === tokenDecode?.user?.id && (
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
						{listCheckPermission.isAllowRejectServicePengembalian &&
							record.current_approver === tokenDecode?.user?.id && (
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
						{listCheckPermission.isAllowUpdateServicePengembalian &&
							(isNewAndNotApproved || isRejected) && (
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
						{listCheckPermission.isAllowDeleteServicePengembalian &&
							isNewAndNotApproved && (
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
