import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IInventory } from "store/types/inventoryTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<IInventory> = [
		{
			title: "Nama Barang",
			dataIndex: "name",
		},
		{
			title: "MG",
			dataIndex: "main_group",
			width: 80,
			align: "center",
		},
		{
			title: "SG",
			dataIndex: "sub_group",
			width: 80,
			align: "center",
		},
		{
			title: "TH",
			dataIndex: "year",
			width: 100,
			align: "center",
		},
		{
			title: "No. Item",
			dataIndex: "serial_no",
			width: 100,
			align: "center",
		},
		{
			title: "No. HBB/Inventaris",
			dataIndex: "code",
		},
		{
			title: "Jenis Barang",
			dataIndex: "inventory_type",
		},
		{
			title: "Lokasi",
			dataIndex: "location",
		},
		{
			title: "Kondisi",
			dataIndex: "kondisi",
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return <ActionButtonTable setShowModal={setShowModal} itemId={text} />;
			},
		},
	];
	return columnType;
};
