import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

export interface IDataType {
	nama_barang: string;
	merk: string;
	tipe: string;
	jenis: string;
	model: string;
	warna: string;
	kapasitas: string;
	ukuran: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Barang",
		dataIndex: "nama_barang",
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
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
