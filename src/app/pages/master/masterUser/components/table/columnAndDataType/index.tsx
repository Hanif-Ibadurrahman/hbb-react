import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { generateRandomHex } from "app/helper/common";
import { listCheckPermission } from "app/helper/permission";
import { IUser } from "store/types/userTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
			uuid?: string;
		}>
	>;
	handleDelete: (id: number) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IUser> = [
		{
			title: "Nama User",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "NIPG",
			dataIndex: "nipg",
			sorter: true,
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: true,
		},
		{
			title: "Satuan Kerja",
			dataIndex: "satker_name",
			sorter: true,
		},
		{
			title: "Bisnis Unit",
			dataIndex: "bisnis_unit_name",
			sorter: true,
		},
		{
			title: "Area",
			dataIndex: "area_name",
			sorter: true,
		},
		{
			title: "Perusahaan",
			dataIndex: "company_name",
			sorter: true,
		},
		{
			title: "Role",
			sorter: true,
			render: (text, record, index) => {
				const roles = record.user_roles.map(value => {
					return (
						<Tag color={`#${generateRandomHex(6)}`}>{value.roles?.name}</Tag>
					);
				});

				return roles;
			},
		},
		{
			title: "Action",
			dataIndex: "user_uuid",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterUser && (
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									setShowModal({ show: true, id: record.id, uuid: text });
								}}
							>
								Edit
							</button>
						)}
						{listCheckPermission.isAllowDeleteMasterUser && (
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
