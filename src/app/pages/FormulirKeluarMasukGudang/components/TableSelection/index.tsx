import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface IDataType {
	satuan_kerja: string;
	lokasi: string;
	no: string;
	name_barang: string;
	kondisi: string;
}

const columns: ColumnsType<IDataType> = [
	{
		title: "Satuan Kerja",
		dataIndex: "satuan_kerja",
	},
	{
		title: "Lokasi",
		dataIndex: "lokasi",
	},
	{
		title: "No. HBB/Inventaris",
		dataIndex: "no",
	},
	{
		title: "Nama Barang",
		dataIndex: "name_barang",
	},
	{
		title: "Kondisi",
		dataIndex: "kondisi",
	},
];

export const TableSelection = () => {
	let data: any = [];
	for (let i = 1; i <= 20; i++) {
		data.push({
			satuan_kerja: "Asset and Facility Management",
			lokasi:
				"Tangerang - Area Tangerang dan Sekitarnya - Gudang Peralatan, Offtake Serpong",
			no: "0401010066",
			name_barang: `Barang ${i}`,
			kondisi: "Baik",
		});
	}

	return (
		<Table
			rowKey={"name_barang"}
			rowSelection={{
				type: "checkbox",
				onChange: (selectedRowKeys, selectedRows) => {
					console.log(selectedRowKeys);
					console.log(selectedRows);
				},
			}}
			dataSource={data}
			columns={columns}
		/>
	);
};
