import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	bisnis_unit: string;
	area: string;
	satuan_kerja: string;
	nama_kepala_satuan_kerja: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Bisnis Unit",
		dataIndex: "bisnis_unit",
		sorter: true,
	},
	{
		title: "Area",
		dataIndex: "area",
		sorter: true,
	},
	{
		title: "Satuan Kerja",
		dataIndex: "satuan_kerja",
		sorter: true,
	},
	{
		title: "Nama Kepala Satuan Kerja",
		dataIndex: "nama_kepala_satuan_kerja",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return (
				<>
					<Button type="primary">Edit</Button>
					<Button type="primary" danger>
						Delete
					</Button>
				</>
			);
		},
	},
];
