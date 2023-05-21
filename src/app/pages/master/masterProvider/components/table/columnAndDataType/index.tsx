import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IProvider } from "store/types/providerTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
}

export const columns = ({ setShowModal }: IColumn) => {
	const columnType: ColumnsType<IProvider> = [
		{
			title: "Nama User",
			dataIndex: "nama_penyedia",
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
			title: "Perusahaan",
			sorter: true,
			render: (text, record, index) => {
				return record.company?.name;
			},
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterPenyedia && (
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									setShowModal({ show: true, id: text });
								}}
							>
								Edit
							</button>
						)}
						{/* {listCheckPermission.isAllowDeleteMasterPenyedia && (
							<button
								type="button"
								className="btn"
								style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
								onClick={() => {
									handleDelete(text);
								}}
							>
								Delete
							</button>
						)} */}
					</div>
				);
			},
		},
	];
	return columnType;
};
