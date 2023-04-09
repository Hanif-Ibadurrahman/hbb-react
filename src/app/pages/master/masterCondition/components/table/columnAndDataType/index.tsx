import { ColumnsType } from "antd/es/table";
export interface IDataType {
	kondisi: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Kondisi",
		dataIndex: "kondisi",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <></>;
		},
	},
];
