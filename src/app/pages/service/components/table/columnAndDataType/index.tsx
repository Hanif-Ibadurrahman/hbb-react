import { ColumnsType } from "antd/es/table";
export interface IDataType {
	no: string;
	name_barang: string;
	lokasi: string;
	jenis_kerusakan: string;
	lampiran: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "No. HBB/Inventaris",
		dataIndex: "no",
		sorter: true,
	},
	{
		title: "Nama Barang",
		dataIndex: "name_barang",
		sorter: true,
	},
	{
		title: "Lokasi",
		dataIndex: "lokasi",
		sorter: true,
	},
	{
		title: "Jenis Kerusanan",
		dataIndex: "jenis_kerusakan",
		sorter: true,
	},
	{
		title: "Lampiran",
		dataIndex: "lampiran",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <></>;
		},
	},
];
