import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

export const columns = () => {
	const columnType: ColumnsType<any> = [
		{
			title: "No Transaksi",
			dataIndex: "no_urut",
		},
		{
			title: "Tipe Transaksi",
			dataIndex: "transaction_type",
			// align: "center",
			render: (text, record, index) => {
				return record.transaction_type.toUpperCase();
				// switch (record.transaction_type) {
				// 	case "perbaikan":
				// 		return (
				// 			<Button style={{ backgroundColor: "#ffff00", color: "#ffffff" }}>
				// 				PERBAIKAN
				// 			</Button>
				// 		);
				// 	case "permintaan":
				// 		return (
				// 			<Button style={{ backgroundColor: "#008000", color: "#ffffff" }}>
				// 				PERMINTAAN
				// 			</Button>
				// 		);
				// 	case "pengembalian":
				// 		return (
				// 			<Button style={{ backgroundColor: "#0000ff", color: "#ffffff" }}>
				// 				PENGEMBALIAN
				// 			</Button>
				// 		);
				// 	case "penggantian":
				// 		return (
				// 			<Button style={{ backgroundColor: "#ee82ee ", color: "#ffffff" }}>
				// 				PENGGANTIAN
				// 			</Button>
				// 		);
				// 	case "perubahan":
				// 		return (
				// 			<Button style={{ backgroundColor: "#4b0082", color: "#ffffff" }}>
				// 				PERUBAHAN
				// 			</Button>
				// 		);
				// 	case "pemeriksaan":
				// 		return (
				// 			<Button style={{ backgroundColor: "#ffa500", color: "#ffffff" }}>
				// 				PEMERIKSAAN
				// 			</Button>
				// 		);
				// 	case "penghapusan":
				// 		return (
				// 			<Button style={{ backgroundColor: "#ff0000", color: "#ffffff" }}>
				// 				PENGHAPUSAN
				// 			</Button>
				// 		);
				// 	default:
				// 		return (
				// 			<Button type="primary" danger>
				// 				Tipe Transaksi Tidak Tersedia
				// 			</Button>
				// 		);
				// }
			},
		},
		{
			title: "Tanggal dibuat",
			dataIndex: "created_at",
		},
		{
			title: "Action",
			render: (text, record, index) => {
				switch (record.transaction_type) {
					case "perbaikan":
						return <Link to={"/permintaan-perbaikan"}>Menuju page</Link>;
					case "permintaan":
						return <Link to={"/permintaan-layanan"}>Menuju page</Link>;
					case "pengembalian":
						return <Link to={"/permintaan-pengembalian"}>Menuju page</Link>;
					case "penggantian":
						return <Link to={"/permintaan-penggantian"}>Menuju page</Link>;
					case "perubahan":
						return <Link to={"/permintaan-perubahan"}>Menuju page</Link>;
					case "pemeriksaan":
						return <Link to={"/permintaan-pemeriksaan"}>Menuju page</Link>;
					case "penghapusan":
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
