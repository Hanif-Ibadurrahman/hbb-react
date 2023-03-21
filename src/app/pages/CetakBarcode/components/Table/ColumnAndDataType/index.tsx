import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	area: string;
	daerah: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Area",
		dataIndex: "area",
		sorter: true,
	},
	{
		title: "Daerah",
		dataIndex: "daerah",
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
