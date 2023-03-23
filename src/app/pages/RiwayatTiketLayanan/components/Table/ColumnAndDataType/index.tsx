import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	nomor: string;
	tanggal: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nomor",
		dataIndex: "nomor",
		sorter: true,
	},
	{
		title: "Tanggal",
		dataIndex: "tanggal",
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
