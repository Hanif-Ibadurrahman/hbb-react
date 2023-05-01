import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IDivision } from "store/types/divisionTypes";
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
	const columnType: ColumnsType<IDivision> = [
		{
			title: "Nama Divisi",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Bisnis Unit",
			sorter: true,
			render: (text, record, index) => {
				return record.bisnis_unit?.name;
			},
		},
		{
			title: "Area",
			sorter: true,
			render: (text, record, index) => {
				return record.area?.name;
			},
		},
		{
			title: "Satuan Kerja",
			sorter: true,
			render: (text, record, index) => {
				return record.satker?.name;
			},
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterArea && (
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
						{listCheckPermission.isAllowDeleteMasterArea && (
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
