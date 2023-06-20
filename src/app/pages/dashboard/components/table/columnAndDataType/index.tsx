import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface IColomn {
	handleApprove: (record: any) => void;
	handleReject: (record: any) => void;
}

export const columns = ({ handleApprove, handleReject }: IColomn) => {
	const columnType: ColumnsType<any> = [
		{
			title: "No Transaksi",
			width: 130,
			align: "center",
			dataIndex: "no_urut",
		},
		{
			title: "Tipe Transaksi",
			dataIndex: "transaction_type",
			width: 150,
			render: (text, record, index) => {
				return record.transaction_type.toUpperCase();
			},
		},
		{
			title: "Tanggal dibuat",
			dataIndex: "created_at",
			width: 180,
		},
		{
			title: "Action",
			render: (text, record, index) => {
				let content;
				switch (record.transaction_type) {
					case "perbaikan":
						content = (
							<Link to={"/permintaan-perbaikan"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					case "permintaan":
						content = (
							<Link to={"/permintaan-layanan"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					case "pengembalian":
						content = (
							<Link to={"/permintaan-pengembalian"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					case "penggantian":
						content = (
							<Link to={"/permintaan-penggantian"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					case "perubahan":
						content = (
							<Link to={"/permintaan-perubahan"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					case "pemeriksaan":
						content = (
							<Link to={"/permintaan-pemeriksaan"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					case "penghapusan":
						content = (
							<Link to={"/permintaan-penghapusan"}>
								<button type="button" className="btn btn-secondary">
									Menuju page
								</button>
							</Link>
						);
						break;
					default:
						content = (
							<Button type="primary" danger>
								Tipe Transaksi Tidak Tersedia
							</Button>
						);
				}
				return (
					<Space>
						<button
							type="button"
							className="btn btn-success"
							onClick={() => {
								handleApprove(record);
							}}
						>
							Approve
						</button>
						<button
							type="button"
							className="btn"
							style={{ backgroundColor: "#ff4d4f", color: "#ffffff" }}
							onClick={() => {
								handleReject(record);
							}}
						>
							Reject
						</button>
						{content}
					</Space>
				);
			},
		},
	];
	return columnType;
};
