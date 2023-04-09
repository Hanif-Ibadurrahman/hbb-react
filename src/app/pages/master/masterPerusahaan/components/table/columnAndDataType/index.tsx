import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

export interface IDataType {
	nama_perusahaan: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Perusahaan",
		dataIndex: "nama_perusahaan",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
