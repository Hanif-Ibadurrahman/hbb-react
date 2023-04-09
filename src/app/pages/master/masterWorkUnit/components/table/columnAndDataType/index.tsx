import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IWorkUnit } from "store/types/workUnitTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<IWorkUnit> = [
		{
			title: "Bisnis Unit",
			dataIndex: "bisnis_unit",
			sorter: true,
			render: (text, record, index) => {
				return record.bisnis_unit.name;
			},
		},
		{
			title: "Area",
			dataIndex: "area",
			sorter: true,
			render: (text, record, index) => {
				return record.area.name;
			},
		},
		{
			title: "Satuan Kerja",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Nama Kepala Satuan Kerja",
			dataIndex: "nama_kepala_satuan_kerja",
			sorter: true,
			render: (text, record, index) => {
				return record.employee?.emp_name;
			},
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
