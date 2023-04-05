import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

export interface IDataType {
	id: string;
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
			return <ActionButtonTable />;
		},
	},
];
