import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IInventory } from "store/types/inventoryTypes";

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
	const columnType: ColumnsType<IInventory> = [
		{
			title: "Nama Barang",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "MG",
			dataIndex: "main_group",
			width: 80,
			align: "center",
			sorter: true,
		},
		{
			title: "SG",
			dataIndex: "sub_group",
			width: 80,
			align: "center",
			sorter: true,
		},
		{
			title: "TH",
			dataIndex: "year",
			width: 100,
			align: "center",
			sorter: true,
		},
		{
			title: "No. Item",
			dataIndex: "serial_no",
			width: 100,
			align: "center",
			sorter: true,
		},
		{
			title: "No. HBB/Inventaris",
			dataIndex: "code",
			sorter: true,
		},
		{
			title: "Jenis Barang",
			dataIndex: "inventory_type",
			sorter: true,
		},
		{
			title: "Lokasi",
			dataIndex: "location",
			sorter: true,
		},
		{
			title: "Kondisi",
			dataIndex: "kondisi",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => {
								setShowModal({ show: true, id: text });
							}}
						>
							Edit
						</button>
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
					</div>
				);
			},
		},
	];
	return columnType;
};
