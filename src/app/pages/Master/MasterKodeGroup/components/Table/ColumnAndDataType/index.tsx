import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/Table/Antd/ActionButtonTable";

export interface IDataType {
	nama_main_group: string;
	kode_main_group: string;
	nama_sub_group: string;
	kode_sub_group: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Main Group",
		dataIndex: "nama_main_group",
		sorter: true,
	},
	{
		title: "Kode Main Group",
		dataIndex: "kode_main_group",
		sorter: true,
	},
	{
		title: "Nama Sub Group",
		dataIndex: "nama_sub_group",
		sorter: true,
	},
	{
		title: "Kode Sub Group",
		dataIndex: "kode_sub_group",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
