import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/Table/Antd/ActionButtonTable";

export interface IDataType {
	nama_user: string;
	bisnis_unit: string;
	area: string;
	role: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama User",
		dataIndex: "nama_user",
		sorter: true,
	},
	{
		title: "Bisnis Unit",
		dataIndex: "bisnis_unit",
		sorter: true,
	},
	{
		title: "Area",
		dataIndex: "area",
		sorter: true,
	},
	{
		title: "Role",
		dataIndex: "role",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
