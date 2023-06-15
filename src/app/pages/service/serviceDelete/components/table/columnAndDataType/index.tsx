import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { ITokenDecode } from "store/types/loginTypes";
import { IServiceDelete } from "store/types/serviceDeleteTypes";
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
	tokenDecode?: ITokenDecode;
}

export const columns = ({
	setShowModal,
	handleDelete,
	handleApprove,
	handleReject,
	tokenDecode,
}: IColumn) => {
	const columnType: ColumnsType<IServiceDelete> = [
		{
			title: "No Transaksi",
			dataIndex: "no_urut",
			align: "center",
			sorter: true,
		},
		{
			title: "Jenis Barang",
			dataIndex: "inventory_type",
			sorter: true,
			render: (text, record, index) => {
				switch (text) {
					case 1:
						return "Inventaris";
					case 2:
						return "Hbb";
					default:
						return;
				}
			},
		},
		{
			title: "No. HBB/Inventaris",
			dataIndex: "inventory_code",
			sorter: true,
		},
		{
			title: "Kondisi",
			dataIndex: "condition",
			sorter: true,
		},
		{
			title: "Alasan",
			dataIndex: "reason",
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
						{listCheckPermission.isAllowApproveServicePenghapusan &&
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
						{listCheckPermission.isAllowRejectServicePenghapusan &&
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
						{listCheckPermission.isAllowUpdateServicePenghapusan &&
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
						{listCheckPermission.isAllowDeleteServicePenghapusan &&
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
