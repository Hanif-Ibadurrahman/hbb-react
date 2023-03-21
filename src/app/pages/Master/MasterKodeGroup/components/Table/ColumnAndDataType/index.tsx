import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	nama_main_group: string;
	kode_main_group: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Main Group",
		dataIndex: "nama_main_group",
		sorter: true,
	},
	{
		title: "Kode Main Group",
		dataIndex: "kode_main_group",
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
