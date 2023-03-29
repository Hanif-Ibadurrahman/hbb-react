import { ColumnsType } from "antd/es/table";

export interface IDataType {
	satuan_kerja: string;
	lokasi: string;
	no: string;
	name_barang: string;
	kondisi: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Satuan Kerja",
		dataIndex: "satuan_kerja",
	},
	{
		title: "Lokasi",
		dataIndex: "lokasi",
	},
	{
		title: "No. HBB/Inventaris",
		dataIndex: "no",
	},
	{
		title: "Nama Barang",
		dataIndex: "name_barang",
	},
	{
		title: "Kondisi",
		dataIndex: "kondisi",
	},
];
