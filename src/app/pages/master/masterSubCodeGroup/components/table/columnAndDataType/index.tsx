import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { ICodeGroup } from "store/types/codeGroupTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
}

interface IData extends ICodeGroup {
	mainGroupName: string;
	mainGroupCode: string;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IData> = [
		{
			title: "Nama Main Group",
			dataIndex: "mainGroupName",
			sorter: true,
		},
		{
			title: "Kode Kode Group",
			dataIndex: "mainGroupCode",
			sorter: true,
		},
		{
			title: "Nama Sub Group",
			dataIndex: "value",
			sorter: true,
			render: (text, record, index) => {
				return record.value;
			},
		},
		{
			title: "Kode Sub Group",
			dataIndex: "code",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterSubGroup && (
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
						{listCheckPermission.isAllowDeleteMasterSubGroup && (
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
