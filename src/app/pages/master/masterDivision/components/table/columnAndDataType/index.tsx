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
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<IDivision> = [
		{
			title: "Nama Divisi",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Kepala Divisi",
			dataIndex: "kepala_divisi",
			sorter: true,
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
