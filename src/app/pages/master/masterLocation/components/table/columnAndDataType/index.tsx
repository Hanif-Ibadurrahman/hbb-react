import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { ILocation } from "store/types/locationTypes";

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
	const columnType: ColumnsType<ILocation> = [
		{
			title: "Bisnis Unit",
			sorter: true,
			render: (text, record, index) => {
				return record.satker?.bisnis_unit?.name;
			},
		},
		{
			title: "Area",
			sorter: true,
			render: (text, record, index) => {
				return record.satker?.area?.name;
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
			title: "Nama Lokasi",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Nama Penanggung Jawab",
			sorter: true,
			render: (text, record, index) => {
				return record.employee?.emp_name;
			},
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterLocation && (
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
						{listCheckPermission.isAllowDeleteMasterLocation && (
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
