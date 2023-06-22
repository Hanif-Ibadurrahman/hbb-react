import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { ITokenDecode } from "store/types/loginTypes";
import { IServiceReplacement } from "store/types/serviceReplacementTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
	handleApprove: (id: number, record: any) => void;
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
	const columnType: ColumnsType<IServiceReplacement> = [
		{
			title: "No Transaksi",
			dataIndex: "no_urut",
			align: "center",
			sorter: true,
		},
		{
			title: "No HBB/Inventaris yang dikembalikan",
			dataIndex: "inventory_return",
			sorter: true,
		},
		{
			title: "No HBB/Inventaris yang diminta",
			dataIndex: "inventory_obtained_code",
			sorter: true,
		},
		{
			title: "Deskripsi HBB/Inventaris",
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
			title: "Nama Pemakai Akhir",
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
						{listCheckPermission.isAllowApproveServicePenggantian &&
							record.current_approver === tokenDecode?.user?.id && (
								<button
									type="button"
									className="btn btn-success"
									onClick={() => {
										handleApprove(text, record);
									}}
								>
									Approve
								</button>
							)}
						{listCheckPermission.isAllowRejectServicePenggantian &&
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
						{listCheckPermission.isAllowUpdateServicePenggantian &&
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
						{listCheckPermission.isAllowDeleteServicePenggantian &&
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
