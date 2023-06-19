import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { IServiceTicketHistory } from "store/types/serviceTicketHistoryTypes";
interface IColumn {
	setShowModalDetail: React.Dispatch<
		React.SetStateAction<{
			show: boolean;
			id?: number;
		}>
	>;
}

export const columns = ({ setShowModalDetail }: IColumn) => {
	const columnType: ColumnsType<IServiceTicketHistory> = [
		{
			title: "No Transaksi",
			dataIndex: "no_urut",
			align: "center",
			sorter: true,
		},
		{
			title: "Tipe Transaksi",
			dataIndex: "type",
			sorter: true,
			render: (text, record, index) => {
				return text?.toUpperCase();
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			sorter: true,
			render: (text, record, index) => {
				if (text === "selesai") {
					return (
						<Button type="primary" style={{ background: "#43d854" }}>
							Finish
						</Button>
					);
				} else {
					return (
						<Button type="primary" danger>
							Reject
						</Button>
					);
				}
			},
		},
		{
			title: "Requester",
			dataIndex: "name",
			sorter: true,
		},
		{
			title: "Tanggal",
			dataIndex: "created_at",
			sorter: true,
		},
		{
			title: "Action",
			dataIndex: "id",
			render: (text, record, index) => {
				let buttonPrint;

				switch (record.type) {
					case "penghapusan":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/usulan-penghapusan/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					case "perbaikan":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/perbaikan/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					case "permintaan":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/permintaan/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					case "pengembalian":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/pengembalian/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					case "penggantian":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/penggantian/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					case "pemeriksaan":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/pemeriksaan/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					case "perubahan":
						buttonPrint = (
							<button type="button" className="btn btn-info">
								<a
									href={`${process.env.REACT_APP_API_URL}/api/reporting/formulir-transaksi/perubahan/${record.transaction_id}`}
									style={{ color: "#ffffff" }}
									rel="noreferrer"
									target="_blank"
								>
									Print
								</a>
							</button>
						);
						break;

					default:
						break;
				}

				return (
					<div style={{ display: "flex", columnGap: 5 }}>
						{buttonPrint}
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => {
								setShowModalDetail({ show: true, id: text });
							}}
						>
							Detail
						</button>
					</div>
				);
			},
		},
	];
	return columnType;
};
