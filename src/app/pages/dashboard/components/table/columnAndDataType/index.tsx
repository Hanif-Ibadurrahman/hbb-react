import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { redirect } from "react-router-dom";

export const columns = () => {
	const columnType: ColumnsType<any> = [
		{
			title: "No Transaksi",
			dataIndex: "transaction_no",
		},
		{
			title: "Tipe Transaksi",
			dataIndex: "inventory_type",
		},
		{
			title: "Catatan",
			dataIndex: "note",
		},
		{
			title: "Tanggal dibuat",
			dataIndex: "created_at",
		},
		{
			title: "Action",
			render: (text, record, index) => {
				switch (record.inventory_type) {
					case "PERBAIKAN":
						return (
							<Button type="link" href="/permintaan-perbaikan">
								Menuju page
							</Button>
						);
					case "PERMINTAAN":
						return (
							<Button type="link" href="/permintaan-layanan">
								Menuju page
							</Button>
						);
					case "PENGEMBALIAN":
						return (
							<Button type="link" href="/permintaan-pengembalian">
								Menuju page
							</Button>
						);
					case "PENGGANTIAN":
						return (
							<Button type="link" href="/permintaan-penggantian">
								Menuju page
							</Button>
						);
					case "PERUBAHAN":
						return (
							<Button type="link" href="/permintaan-perubahan">
								Menuju page
							</Button>
						);
					case "PEMERIKSAAN":
						return (
							<Button type="link" href="/permintaan-pemeriksaan">
								Menuju page
							</Button>
						);
					case "PENGHAPUSAN":
						return (
							<Button type="link" href="/permintaan-penghapusan">
								Menuju page
							</Button>
						);
					default:
						return (
							<Button type="primary" danger>
								Tipe Transaksi Tidak Tersedia
							</Button>
						);
				}
			},
		},
	];
	return columnType;
};
