import { ColumnsType } from "antd/es/table";
import { ICorporateInventoryReport } from "store/types/corporateInventoryReportTypes";

export const columns = () => {
	const columnType: ColumnsType<ICorporateInventoryReport> = [
		{
			title: "No. HBB/Inventaris",
			dataIndex: "code",
		},
		{
			title: "Satuan Kerja",
			dataIndex: "satker",
		},
		{
			title: "Lokasi",
			dataIndex: "location",
		},
		{
			title: "Nama Barang",
			dataIndex: "name",
		},
		{
			title: "Main Group",
			dataIndex: "main_group",
		},
		{
			title: "Sub Group",
			dataIndex: "sub_group",
		},
		{
			title: "Kondisi",
			dataIndex: "condition_name",
		},
	];
	return columnType;
};
