import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { NavigateFunction } from "react-router-dom";
import { ICodeGroup } from "store/types/codeGroupTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
	navigate: NavigateFunction;
}

export const columns = ({ setShowModal, handleDelete, navigate }: IColumn) => {
	const columnType: ColumnsType<ICodeGroup> = [
		{
			title: "Nama Main Group",
			dataIndex: "value",
			sorter: true,
			render: (text, record, index) => {
				return record.value;
			},
		},
		{
			title: "Kode Main Group",
			dataIndex: "code",
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
						<button
							type="button"
							className="btn btn-info"
							onClick={() => {
								navigate("/master-sub-main-group", {
									replace: true,
									state: { mainGroupData: record },
								});
							}}
						>
							List
						</button>
						{listCheckPermission.isAllowUpdateMasterMainGroup && (
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
						{listCheckPermission.isAllowDeleteMasterMainGroup && (
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
