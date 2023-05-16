import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { ITokenDecode } from "store/types/loginTypes";
import { IServiceDisplacement } from "store/types/serviceDisplacementTypes";
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
	tokenDecode?: ITokenDecode;
}

export const columns = ({
	setShowModal,
	handleDelete,
	handleApprove,
	handleReject,
	tokenDecode,
}: IColumn) => {
	const columnType: ColumnsType<IServiceDisplacement> = [
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
			title: "Dari User",
			dataIndex: "from_name",
			sorter: true,
		},
		{
			title: "Untuk User",
			dataIndex: "to_name",
			sorter: true,
		},
		{
			title: "Lokasi",
			dataIndex: "location_name",
			sorter: true,
		},
		{
			title: "Tanggal",
			dataIndex: "date",
			sorter: true,
		},
		{
			title: "Tahap Approve",
			dataIndex: "pending_status",
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
						{listCheckPermission.isAllowApproveServicePemindahan &&
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
						{listCheckPermission.isAllowRejectServicePemindahan &&
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
