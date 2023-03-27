import { Button } from "antd";
import { ColumnsType } from "antd/es/table";

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
			return (
				<div style={{ display: "flex", columnGap: 5 }}>
					<Button type="primary">Edit</Button>
					<Button type="primary" danger>
						Delete
					</Button>
				</div>
			);
		},
	},
];
