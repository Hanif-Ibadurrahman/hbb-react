import { Modal } from "antd";
import { ColumnsType } from "antd/es/table";

export interface IDataType {
	nomor: string;
	tanggal: string;
}

export const columns: ColumnsType<IDataType> = [
	{
		title: "Nomor",
		dataIndex: "nomor",
		sorter: true,
	},
	{
		title: "Tanggal",
		dataIndex: "tanggal",
		sorter: true,
	},
	{
		title: "Action",
		render: (text, record, index) => {
			return (
				<button
					type="button"
					className="btn"
					style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
					onClick={() => {
						Modal.confirm({
							title: "Hapus Data",
							content: "Apakah anda yakin ingin menghapus ini?",
							cancelText: "Batal",
							okText: "Hapus",
							okType: "danger",
						});
					}}
				>
					Delete
				</button>
			);
		},
	},
];
