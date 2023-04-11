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
	handleDelete: (id: string) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
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
