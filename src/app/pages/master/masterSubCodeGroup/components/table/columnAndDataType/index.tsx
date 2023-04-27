import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { ICodeGroup } from "store/types/codeGroupTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string;
		}>
	>;
	handleDelete: (id: string) => void;
}

interface IData extends ICodeGroup {
	mainGroupName: string;
	mainGroupCode: string;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IData> = [
		{
			title: "Nama Main Group",
			dataIndex: "mainGroupName",
			sorter: true,
		},
		{
			title: "Kode Kode Group",
			dataIndex: "mainGroupCode",
			sorter: true,
		},
		{
			title: "Nama Sub Group",
			dataIndex: "value",
			sorter: true,
			render: (text, record, index) => {
				return record.value;
			},
		},
		{
			title: "Kode Sub Group",
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
