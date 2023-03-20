import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface IDataType {
	name_barang: string;
	mg: string;
	sg: string;
	th: string;
	no_item: string;
	no: string;
	jenis_barang: string;
	lokasi: string;
	kondisi: string;
}

const columns: ColumnsType<IDataType> = [
	{
		title: "Nama Barang",
		dataIndex: "name_barang",
	},
	{
		title: "MG",
		dataIndex: "mg",
	},
	{
		title: "SG",
		dataIndex: "sg",
	},
	{
		title: "TH",
		dataIndex: "th",
	},
	{
		title: "No. Item",
		dataIndex: "no_item",
	},
	{
		title: "No. HBB/Inventaris",
		dataIndex: "no",
	},
	{
		title: "Jenis Barang",
		dataIndex: "jenis_barang",
	},
	{
		title: "Lokasi",
		dataIndex: "lokasi",
	},
	{
		title: "Kondisi",
		dataIndex: "kondisi",
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return (
				<>
					<Button type="primary">Edit</Button>
					<Button type="primary" danger>
						Delete
					</Button>
				</>
			);
		},
	},
];

export const TableSelection = () => {
	const data: any = [];
	for (let i = 1; i <= 20; i++) {
		data.push({
			name_barang: `Barang ${i}`,
			mg: "04",
			sg: "01",
			th: "01",
			no_item: "0066",
			no: "0401010066",
			jenis_barang: "HBB",
			lokasi:
				"Tangerang - Area Tangerang dan Sekitarnya - Gudang Peralatan, Offtake Serpong",
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
