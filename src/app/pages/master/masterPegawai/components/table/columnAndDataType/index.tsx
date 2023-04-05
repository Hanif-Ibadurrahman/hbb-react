import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

export interface IDataType {
	nama_pegawai: string;
	nipg: string;
	jabatan: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Pegawai",
		dataIndex: "nama_pegawai",
		sorter: true,
	},
	{
		title: "NIPG",
		dataIndex: "nipg",
		sorter: true,
	},
	{
		title: "Jabatan",
		dataIndex: "jabatan",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
