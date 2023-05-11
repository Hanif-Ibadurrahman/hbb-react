import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IItem } from "store/types/itemTypes";

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
	const columnType: ColumnsType<IItem> = [
		{
			title: "Nama Barang",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Merk",
			dataIndex: "merk",
			sorter: true,
		},
		{
			title: "Tipe",
			dataIndex: "tipe",
			sorter: true,
		},
		{
			title: "Jenis",
			dataIndex: "jenis",
			sorter: true,
		},
		{
			title: "Model",
			dataIndex: "model",
			sorter: true,
		},
		{
			title: "Warna",
			dataIndex: "color_name",
			sorter: true,
		},
		{
			title: "Kapasitas",
			dataIndex: "kapasitas",
			sorter: true,
		},
		{
			title: "Ukuran",
			dataIndex: "ukuran",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterItem && (
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
						{listCheckPermission.isAllowDeleteMasterItem && (
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
