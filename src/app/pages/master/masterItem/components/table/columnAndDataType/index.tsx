import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IItem } from "store/types/itemTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
}

export const columns = ({ setShowModal }: IColumn) => {
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
			dataIndex: "warna",
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
				return <ActionButtonTable setShowModal={setShowModal} itemId={text} />;
			},
		},
	];
	return columnType;
};
