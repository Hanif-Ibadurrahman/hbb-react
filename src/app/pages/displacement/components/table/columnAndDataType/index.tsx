import { ColumnsType } from "antd/es/table";

export interface IDataType {
	name_barang: string;
	mg: string;
	sg: string;
	th: string;
	no_item: string;
	no: string;
	jenis_barang: string;
	lokasi: string;
	kondisi: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Barang",
		dataIndex: "name_barang",
	},
	{
		title: "MG",
		dataIndex: "mg",
	},
	{
		title: "SG",
		dataIndex: "sg",
	},
	{
		title: "TH",
		dataIndex: "th",
	},
	{
		title: "No. Item",
		dataIndex: "no_item",
	},
	{
		title: "No. HBB/Inventaris",
		dataIndex: "no",
	},
	{
		title: "Jenis Barang",
		dataIndex: "jenis_barang",
	},
	{
		title: "Lokasi",
		dataIndex: "lokasi",
	},
	{
		title: "Kondisi",
		dataIndex: "kondisi",
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <></>;
		},
	},
];
