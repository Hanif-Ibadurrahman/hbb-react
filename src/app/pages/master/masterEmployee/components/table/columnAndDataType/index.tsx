import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IEmployee } from "store/types/employeeTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string;
		}>
	>;
	handleDelete: (id: string) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IEmployee> = [
		{
			title: "Nama Pegawai",
			dataIndex: "emp_name",
			sorter: true,
		},
		{
			title: "NIPG",
			dataIndex: "nipg",
			sorter: true,
		},
		{
			title: "Jabatan",
			dataIndex: "jabatan",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterEmployee && (
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
						{listCheckPermission.isAllowDeleteMasterEmployee && (
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
