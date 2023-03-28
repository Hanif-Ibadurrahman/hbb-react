import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/Table/Antd/ActionButtonTable";

export interface IDataType {
	bisnis_unit: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Bisnis Unit",
		dataIndex: "bisnis_unit",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
