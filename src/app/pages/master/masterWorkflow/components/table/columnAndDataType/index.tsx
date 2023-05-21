import { ColumnsType } from "antd/es/table";
import { changeValueToRole, generateRandomHex } from "app/helper/common";
import { listCheckPermission } from "app/helper/permission";
import { IWorkflow } from "store/types/workflowTypes";
import { Tag } from "antd";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IWorkflow> = [
		{
			title: "Nama Workflow",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Deskripsi",
			dataIndex: "description",
			sorter: true,
		},
		{
			title: "Tipe",
			dataIndex: "type",
			sorter: true,
			render: (text, record, index) => {
				return record.type?.toUpperCase();
			},
		},
		{
			title: "Roles",
			sorter: true,
			render: (text, record, index) => {
				return changeValueToRole(record.roles || "")
					.split(" - ")
					.map(value => {
						return <Tag color={`#${generateRandomHex(6)}`}>{value}</Tag>;
					});
			},
		},
		{
			title: "Dibuat",
			dataIndex: "created_at",
			sorter: true,
		},
		{
			title: "Perusahaan",
			sorter: true,
			render: (text, record, index) => {
				return record.company?.name;
			},
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterWorkflow && (
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
						{listCheckPermission.isAllowDeleteMasterWorkflow && (
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
