import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/Table/Antd/ActionButtonTable";

export interface IDataType {
	nama_divisi: string;
	kepala_divisi: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Divisi",
		dataIndex: "nama_divisi",
		sorter: true,
	},
	{
		title: "Kepala Divisi",
		dataIndex: "kepala_divisi",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
