import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

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
			title: "Tanggal dibuat",
			dataIndex: "created_at",
		},
		{
			title: "Action",
			align: "center",
			render: (text, record, index) => {
				switch (record.inventory_type) {
					case "PERBAIKAN":
						return <Link to={"/permintaan-perbaikan"}>Menuju page</Link>;
					case "PERMINTAAN":
						return <Link to={"/permintaan-layanan"}>Menuju page</Link>;
					case "PENGEMBALIAN":
						return <Link to={"/permintaan-pengembalian"}>Menuju page</Link>;
					case "PENGGANTIAN":
						return <Link to={"/permintaan-penggantian"}>Menuju page</Link>;
					case "PERUBAHAN":
						return <Link to={"/permintaan-perubahan"}>Menuju page</Link>;
					case "PEMERIKSAAN":
						return <Link to={"/permintaan-pemeriksaan"}>Menuju page</Link>;
					case "PENGHAPUSAN":
						return <Link to={"/permintaan-penghapusan"}>Menuju page</Link>;
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
