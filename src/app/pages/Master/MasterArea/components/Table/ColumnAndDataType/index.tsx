import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	nama_area: string;
	daerah: string;
	pengelola: string;
	nipg: string;
	pemegang: string;
	bisnis_unit: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Area",
		dataIndex: "nama_area",
		sorter: true,
	},
	{
		title: "Daerah",
		dataIndex: "daerah",
		sorter: true,
	},
	{
		title: "Pengelola",
		dataIndex: "pengelola",
		sorter: true,
	},
	{
		title: "NIPG",
		dataIndex: "nipg",
		sorter: true,
	},
	{
		title: "Pemegang",
		dataIndex: "pemegang",
		sorter: true,
	},
	{
		title: "Bisnis Unit",
		dataIndex: "bisnis_unit",
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
