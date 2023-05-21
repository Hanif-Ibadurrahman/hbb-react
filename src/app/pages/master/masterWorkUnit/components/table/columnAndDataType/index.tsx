import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IWorkUnit } from "store/types/workUnitTypes";
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
	const columnType: ColumnsType<IWorkUnit> = [
		{
			title: "Bisnis Unit",
			dataIndex: "bisnis_unit",
			sorter: true,
			render: (text, record, index) => {
				return record.bisnis_unit?.name;
			},
		},
		{
			title: "Area",
			dataIndex: "area",
			sorter: true,
			render: (text, record, index) => {
				return record.area?.name;
			},
		},
		{
			title: "Satuan Kerja",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Nama Kepala Satuan Kerja",
			dataIndex: "nama_kepala_satuan_kerja",
			sorter: true,
			render: (text, record, index) => {
				return record.employee?.emp_name;
			},
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
						{listCheckPermission.isAllowUpdateMasterSatuanKerja && (
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
						{listCheckPermission.isAllowDeleteMasterSatuanKerja && (
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
