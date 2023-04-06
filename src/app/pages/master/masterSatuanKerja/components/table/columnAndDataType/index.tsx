import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";

export interface IDataType {
	bisnis_unit: string;
	area: string;
	satuan_kerja: string;
	nama_kepala_satuan_kerja: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Bisnis Unit",
		dataIndex: "bisnis_unit",
		sorter: true,
	},
	{
		title: "Area",
		dataIndex: "area",
		sorter: true,
	},
	{
		title: "Satuan Kerja",
		dataIndex: "satuan_kerja",
		sorter: true,
	},
	{
		title: "Nama Kepala Satuan Kerja",
		dataIndex: "nama_kepala_satuan_kerja",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return <ActionButtonTable />;
		},
	},
];
