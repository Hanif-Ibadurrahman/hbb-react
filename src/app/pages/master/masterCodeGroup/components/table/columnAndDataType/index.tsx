import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { ICodeGroup } from "store/types/codeGroupTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<ICodeGroup> = [
		{
			title: "Nama Main Group",
			dataIndex: "value",
			sorter: true,
			render: (text, record, index) => {
				return record.value;
			},
		},
		{
			title: "Kode Main Group",
			dataIndex: "code",
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
