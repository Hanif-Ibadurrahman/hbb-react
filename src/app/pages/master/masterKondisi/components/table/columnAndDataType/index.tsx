import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

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
			return <ActionButtonTable />;
		},
	},
];
