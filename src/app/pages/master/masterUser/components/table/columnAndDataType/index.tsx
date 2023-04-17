import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IUser } from "store/types/userTypes";
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
	const columnType: ColumnsType<IUser> = [
		{
			title: "Nama User",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "NIPG",
			dataIndex: "nipg",
			sorter: true,
		},
		{
			title: "Bisnis Unit",
			dataIndex: "id_bisnit",
			sorter: true,
		},
		{
			title: "Area",
			dataIndex: "id_area",
			sorter: true,
		},
		{
			title: "Role",
			dataIndex: "id_role",
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
