import { ColumnsType } from "antd/es/table";
import { ActionButtonTable } from "app/components/table/antd/actionButtonTable";
import { IManager } from "store/types/managerTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: string | undefined;
		}>
	>;
	handleDelete: (id: string) => void;
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<IManager> = [
		{
			title: "Nama User",
			dataIndex: "nama_pengelola",
			sorter: true,
		},
		{
			title: "NIPG",
			dataIndex: "nipg",
			sorter: true,
		},
		{
			title: "Jabatan",
			dataIndex: "jabatan",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => {
								setShowModal({ show: true, id: text });
							}}
						>
							Edit
						</button>
					</div>
				);
			},
		},
	];
	return columnType;
};
