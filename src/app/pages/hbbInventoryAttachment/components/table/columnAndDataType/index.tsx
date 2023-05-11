import { ColumnsType } from "antd/es/table";
import { IInventoryAttachment } from "store/types/inventoryAttachmentTypes";

export const columns = () => {
	const columnType: ColumnsType<IInventoryAttachment> = [
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
