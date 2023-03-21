import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	nama_divisi: string;
	kepala_divisi: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Divisi",
		dataIndex: "nama_divisi",
		sorter: true,
	},
	{
		title: "Kepala Divisi",
		dataIndex: "kepala_divisi",
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
