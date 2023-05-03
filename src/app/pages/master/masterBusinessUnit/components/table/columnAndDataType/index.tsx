import { ColumnsType } from "antd/es/table";
import { listCheckPermission } from "app/helper/permission";
import { IBusinessUnit } from "store/types/businessUnitTypes";
interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
	handleDelete: (id: number) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IBusinessUnit> = [
		{
			title: "Bisnis Unit",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Perusahaan",
			dataIndex: "id_company",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{listCheckPermission.isAllowUpdateMasterBisnisUnit && (
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
						{listCheckPermission.isAllowDeleteMasterBisnisUnit && (
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
						)}
					</div>
				);
			},
		},
	];
	return columnType;
};
