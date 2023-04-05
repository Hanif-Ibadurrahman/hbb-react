import { ColumnsType } from "antd/es/table";

export interface IDataType {
	no: string;
	satuan_kerja: string;
	lokasi: string;
	name_barang: string;
	main_group: string;
	sub_group: string;
	kondisi: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "No. HBB/Inventaris",
		dataIndex: "no",
	},
	{
		title: "Satuan Kerja",
		dataIndex: "satuan_kerja",
	},
	{
		title: "Lokasi",
		dataIndex: "lokasi",
	},
	{
		title: "Nama Barang",
		dataIndex: "name_barang",
	},
	{
		title: "Main Group",
		dataIndex: "main_group",
	},
	{
		title: "Sub Group",
		dataIndex: "sub_group",
	},
	{
		title: "Kondisi",
		dataIndex: "kondisi",
	},
];
