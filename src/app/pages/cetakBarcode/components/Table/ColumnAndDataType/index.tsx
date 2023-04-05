import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

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
			return <ActionButtonTable />;
		},
	},
];
