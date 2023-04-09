import { ColumnsType } from "antd/es/table";
export interface IDataType {
	nama_user: string;
	nipg: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama User",
		dataIndex: "nama_user",
		sorter: true,
	},
	{
		title: "NIPG",
		dataIndex: "nipg",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <></>;
		},
	},
];
