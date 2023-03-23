import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	negara: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Negara",
		dataIndex: "negara",
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
