import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../dashboard.scoped.scss";
import { DataTable } from "../../../components/Datatables";
import { Card, CardHeader } from "../Components/CardDashboard";
import { Pagination } from "app/components/Pagination";
import {
	getAllConfirmedAdmin,
	getRequestBoxesList,
} from "actions/RequestBoxAction";
import { getCabinetsList } from "actions/CabinetAction";
import { useDispatch, useSelector } from "react-redux";
import {
	selectApprovalList,
	selectRequestBoxes,
} from "store/Selector/RequestBoxSelector";
import { selectCabinets } from "store/Selector/CabinetSelector";
import moment from "moment";
import { selectBoxes } from "store/Selector/BoxSelector";
import { getBoxesList } from "actions/BoxActions";
import { selectReturnItems } from "store/Selector/ReturnItemSelector";
import { getReturnList } from "actions/ReturnAction";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { selectBorrowItems } from "store/Selector/BorrowItemSelector";
import { getBorrowList } from "actions/BorrowItemAction";
import { UploadExcel } from "./UploadExcel";
import { selectTransporters } from "store/Selector/TransporterSelector";
import { getBoxesListNoAsign } from "actions/TransporterAction";

export function DashboardSuperadmin() {
	const user = localStorage.getItem("User");
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const cabinets = useSelector(selectCabinets);
	const boxes = useSelector(selectBoxes);
	const boxesNoAsign = useSelector(selectTransporters);
	const returnItems = useSelector(selectReturnItems);
	const approvalOperationList = useSelector(selectApprovalList);
	const borrowList = useSelector(selectBorrowItems);
	const [title, setTitle] = useState("");

	const BoxData = (page = 1) => {
		dispatch(getBoxesList(page));
	};
	const BoxNoAsign = (page = 1) => {
		dispatch(getBoxesListNoAsign(page));
	};
	const CabinetData = (page = 1) => {
		dispatch(getCabinetsList(page));
	};
	const ReturnData = (page = 1) => {
		dispatch(getReturnList(page));
	};
	const ApprovalDataCSRAdmin = (page = 1) => {
		dispatch(getRequestBoxesList(page));
	};
	const FetchData = (page = 1) => {
		dispatch(getAllConfirmedAdmin(page));
	};
	const BorrowList = (page = 1) => {
		dispatch(getBorrowList(page));
	};
	useEffect(() => {
		BorrowList();
	}, []);
	useEffect(() => {
		CabinetData();
	}, []);
	useEffect(() => {
		if (user === "superadmin") {
			BoxData();
		}
	}, []);
	useEffect(() => {
		if (user === "superadmin") {
			BoxNoAsign();
		}
	}, []);
	useEffect(() => {
		ReturnData();
	}, []);
	useEffect(() => {
		if (user === "csroperation") {
			FetchData();
		}
	}, []);
	useEffect(() => {
		if (user === "csradmin") {
			ApprovalDataCSRAdmin();
		}
	}, []);
	useEffect(() => {
		if (user === "superadmin") {
			return setTitle("Detail Total Box");
		} else if (user === "csradmin") {
			return setTitle("List Pending Approval");
		} else if (user === "csroperation") {
			return setTitle("List Pending Approval");
		} else {
			return setTitle("List Box Di Pinjam");
		}
	}, []);

	const totalCabinets = cabinets.Meta.total;
	const totalBox = boxes.Meta.total;
	const totalBoxNoAsign = boxesNoAsign.Meta.total;
	const totalReturn = returnItems.Meta.total;
	const totalApprovalAdminCSR = requestBoxes.Meta.total;
	const boxCustomer = borrowList.Meta.total;

	const header = [
		{
			title: "Id Request",
			prop: "id",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			prop: "created_at",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			headerCell: sortedProp => {
				return (
					<div className="cur-p">
						{`Tanggal Permintaan`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
			},
			cell: row => {
				return moment(row.created_at).format("DD MMMM YYYY");
			},
		},
		{
			title: "Tipe Permintaan",
			prop: "type",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return (
					<>
						{row.type == "request-box"
							? "Request Box"
							: row.type == "pickup-box"
							? "Pick Up Box"
							: row.type == "borrow-item"
							? "Peminjaman"
							: row.type == "return-item"
							? "Pengembalian"
							: null}
					</>
				);
			},
		},
	];

	const headerCustomer = [
		{
			title: "Code Box",
			prop: "code_box",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Custome Code Box",
			prop: "custom_code_box",
			cellProps: {
				style: { width: "40%" },
			},
		},
	];

	const CardSuperAdmin = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="archive"
						total={totalCabinets || 0}
						text={["Total", <br />, "Cabinet."]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total={totalBoxNoAsign || 0}
						text={["Total Box", <br />, "Tidak terdaftar"]}
					/>
				</div>
				<div className="col col-4 ph-0">
					<CardHeader
						icon="boxes"
						total={totalBox || 0}
						text={["Total Box", <br />, "terdaftar."]}
					/>
				</div>
			</div>
		);
	};

	const CardAdmin = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="archive"
						total={totalCabinets || 0}
						text={["Total", <br />, "Cabinet."]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total="0"
						text={["Cabinet", <br />, "Tersedia."]}
					/>
				</div>
				<div className="col col-4 ph-0">
					<CardHeader
						icon="boxes"
						total={totalApprovalAdminCSR || 0}
						text={["Pending", <br />, "Approval."]}
					/>
				</div>
			</div>
		);
	};

	const CardCustomer = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="archive"
						total={boxCustomer || 0}
						text={["Total", <br />, "Box Terdaftar"]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total={totalBoxNoAsign || 0}
						text={["Total Box", <br />, "Tidak terdaftar"]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total={totalReturn || 0}
						text={["Box di", <br />, "Pinjam."]}
					/>
				</div>
			</div>
		);
	};

	const data = [
		{ company: "Jakpro", totalBox: totalBox },
		{ company: "Company 2", totalBox: 0 },
		{ company: "Company 3", totalBox: 0 },
	];

	const ContentSuperAdmin = (
		<BarChart width={600} height={300} data={data}>
			<XAxis dataKey="company" stroke="#000" />
			<YAxis />
			<Tooltip />
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<Bar dataKey="totalBox" fill="#198754" barSize={30} />
		</BarChart>
	);

	const TableCSRAdmin = () => {
		return (
			<div style={{ width: "100%" }}>
				<DataTable tableHeader={header} tableBody={requestBoxes.RequestBoxes} />
				<Pagination
					pageCount={requestBoxes?.Meta?.last_page}
					onPageChange={data => ApprovalDataCSRAdmin(data.selected + 1)}
				/>
			</div>
		);
	};
	const TableCSROperation = () => {
		return (
			<div style={{ width: "100%" }}>
				<DataTable
					tableHeader={header}
					tableBody={approvalOperationList.RequestBoxes}
				/>
				<Pagination
					pageCount={requestBoxes?.Meta?.last_page}
					onPageChange={data => ApprovalDataCSRAdmin(data.selected + 1)}
				/>
			</div>
		);
	};
	const TableCustomer = () => {
		return (
			<div style={{ width: "100%" }}>
				<UploadExcel />
				<DataTable
					tableHeader={headerCustomer}
					tableBody={returnItems?.ReturnList}
				/>
				<Pagination
					pageCount={returnItems.Meta.last_page}
					onPageChange={data => ReturnData(data.selected + 1)}
				/>
			</div>
		);
	};

	const Table = () => {
		if (user === "superadmin") {
			return ContentSuperAdmin;
		} else if (user === "csradmin") {
			return <TableCSRAdmin />;
		} else if (user === "csroperation") {
			return <TableCSROperation />;
		} else {
			return <TableCustomer />;
		}
	};

	const CardDashboard = () => {
		if (user === "superadmin") {
			return <CardSuperAdmin />;
		} else if (user === "csradmin") {
			return <CardAdmin />;
		} else if (user === "csroperation") {
			return <CardAdmin />;
		} else {
			return <CardCustomer />;
		}
	};

	return (
		<>
			<Helmet>
				<title>Dox - Dashboard Superadmin</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<div className="pos-r p-8 bg-primary-5">
				<h3 className="tc-dark-contrast mb-12 ff-1-bd">
					<span className="ff-1 username text txtf-c">Selamat Datang,</span>
					{user}
				</h3>
				<h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
				<CardDashboard />
			</div>
			<div className="pos-r p-8 pt-0 mt-20">
				<h6 className="mb-3 pt-3">{title}</h6>
				<div className="row w-100% mh-0">
					<div className="col col-12 ph-0 mr-2">
						<Card
							className="d-flex ai-center"
							style={{ border: "1px solid rgba(0,0,0,.1)" }}
						>
							<Table />
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
