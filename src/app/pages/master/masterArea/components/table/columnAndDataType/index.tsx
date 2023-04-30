import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IArea } from "store/types/areaTypes";
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
	const columnType: ColumnsType<IArea> = [
		{
			title: "Nama Area",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Daerah",
			dataIndex: "daerah",
			sorter: true,
		},
		{
			title: "Pemegang",
			dataIndex: "pemegang",
			sorter: true,
		},
		{
			title: "Bisnis Unit",
			dataIndex: "bisnis_unit",
			sorter: true,
			render: (text, record, index) => {
				return record.bisnis_unit?.name;
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
