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
			return <></>;
		},
	},
];
