import { ColumnsType } from "antd/es/table";
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
			return <></>;
		},
	},
];
