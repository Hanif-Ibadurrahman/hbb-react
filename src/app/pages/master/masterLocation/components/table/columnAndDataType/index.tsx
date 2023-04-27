import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { ILocation } from "store/types/locationTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string;
		}>
	>;
	handleDelete: (id: string) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<ILocation> = [
		{
			title: "Bisnis Unit",
			sorter: true,
			render: (text, record, index) => {
				return record.satker?.bisnis_unit?.name;
			},
		},
		{
			title: "Area",
			sorter: true,
			render: (text, record, index) => {
				return record.satker?.area?.name;
			},
		},
		{
			title: "Satuan Kerja",
			sorter: true,
			render: (text, record, index) => {
				return record.satker?.name;
			},
		},
		{
			title: "Nama Lokasi",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Nama Penanggung Jawab",
			sorter: true,
			render: (text, record, index) => {
				return record.employee?.emp_name;
			},
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<ActionButtonTable
						setShowModal={setShowModal}
						handleDelete={handleDelete}
						itemId={text}
					/>
				);
			},
		},
	];
	return columnType;
};
