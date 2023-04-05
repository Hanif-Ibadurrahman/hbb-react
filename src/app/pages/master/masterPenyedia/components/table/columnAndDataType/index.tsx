import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

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
			return <ActionButtonTable />;
		},
	},
];
