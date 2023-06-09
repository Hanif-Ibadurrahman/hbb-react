import { ColumnsType } from "antd/es/table";
import { isHeadOfWorkUnit, isUser } from "app/helper/permission";
import { IInventory } from "store/types/inventoryTypes";

interface IColumn {
	setShowModal: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
			isEdit?: boolean;
		}>
	>;
	handleDelete: (id: number) => void;
}

export const columns = ({ setShowModal, handleDelete }: IColumn) => {
	const columnType: ColumnsType<IInventory> = [
		{
			title: "Nama Barang",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "MG",
			dataIndex: "main_group",
			width: 80,
			align: "center",
			sorter: true,
		},
		{
			title: "SG",
			dataIndex: "sub_group",
			width: 80,
			align: "center",
			sorter: true,
		},
		{
			title: "TH",
			dataIndex: "year",
			width: 100,
			align: "center",
			sorter: true,
		},
		{
			title: "No. Item",
			dataIndex: "serial_no",
			width: 100,
			align: "center",
			sorter: true,
		},
		{
			title: "No. HBB/Inventaris",
			dataIndex: "code",
			sorter: true,
		},
		{
			title: "Jenis Barang",
			dataIndex: "inventory_type",
			sorter: true,
			render: (text, record, index) => {
				switch (text) {
					case 1:
						return "Inventaris";
					case 2:
						return "Hbb";
					default:
						return;
				}
			},
		},
		{
			title: "Lokasi",
			dataIndex: "location",
			sorter: true,
		},
		{
			title: "Kondisi",
			dataIndex: "kondisi",
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
							className="btn btn-warning"
							onClick={() => {
								setShowModal({ show: true, id: text, isEdit: false });
							}}
						>
							Detail
						</button>
						{!isUser && !isHeadOfWorkUnit && (
							<>
								<button type="button" className="btn btn-info">
									<a
										href={`${process.env.REACT_APP_API_URL}/api/barcode/pdf?codes=${record.code}`}
										style={{ color: "#ffffff" }}
										rel="noreferrer"
										target="_blank"
									>
										Print
									</a>
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => {
										setShowModal({ show: true, id: text, isEdit: true });
									}}
								>
									Edit
								</button>
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
							</>
						)}
					</div>
				);
			},
		},
	];
	return columnType;
};
