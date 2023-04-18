import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IDivision } from "store/types/divisionTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
	handleDelete: (id: string) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IDivision> = [
		{
			title: "Nama Divisi",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Bisnis Unit",
			sorter: true,
			render: (text, record, index) => {
				return record.bisnis_unit?.name;
			},
		},
		{
			title: "Area",
			sorter: true,
			render: (text, record, index) => {
				return record.area?.name;
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
