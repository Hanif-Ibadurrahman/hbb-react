import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

export interface IDataType {
	id: number;
	name: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Negara",
		dataIndex: "name",
		sorter: true,
	},
	{
		title: "Action",
		dataIndex: "id",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
