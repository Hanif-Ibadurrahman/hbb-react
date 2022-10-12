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
import { Dropdown, Form } from "react-bootstrap";
import { selectAreas } from "store/Selector/AreaSelector";
import { getAreasList } from "actions/AreaActions";
import {
	selectActivityLogs,
	selectActivityLogsArchiver,
} from "store/Selector/ActivityLogSelector";
import {
	GetActivityLogsArchiver,
	GetActivityLogsSuperAdmin,
} from "actions/ActivityLogAction";
import { getDocumentsList } from "actions/DocumentAction";
import { selectDocuemnts } from "store/Selector/DocumentSelector";
import { selectCompanys } from "store/Selector/CompanySelector";
import { getCompanyList } from "actions/CompanyAction";

export function DashboardSuperadmin() {
	const user = localStorage.getItem("User");
	const userName = localStorage.getItem("UserName");
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const cabinets = useSelector(selectCabinets);
	const boxes = useSelector(selectBoxes);
	const boxesNoAsign = useSelector(selectTransporters);
	const returnItems = useSelector(selectReturnItems);
	const approvalOperationList = useSelector(selectApprovalList);
	const borrowList = useSelector(selectBorrowItems);
	const activityLogs = useSelector(selectActivityLogs);
	const activityLogsSuperAdmin = activityLogs?.ActivityLogsSuperadmin;
	const activityLogsArchiver = useSelector(selectActivityLogsArchiver);
	const areas = useSelector(selectAreas);
	const areaList = areas?.Areas;
	const documents = useSelector(selectDocuemnts);
	const Companys = useSelector(selectCompanys);
	const companyList = Companys.Companys as any;
	const [title, setTitle] = useState("");
	const [selectedItem, setSelectedItem] = useState("");
	const [selectedCompany, setSelectedCompany] = useState("");

	const BoxData = (page = 1) => {
		dispatch(getBoxesList(page, selectedCompany));
	};
	const BoxNoAsign = (page = 1) => {
		dispatch(getBoxesListNoAsign(page, selectedCompany));
	};
	const CabinetData = (page = 1) => {
		dispatch(getCabinetsList(page, selectedCompany));
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
	const AreaList = (page = 1) => {
		dispatch(getAreasList(page));
	};
	const ArchiverLog = () => {
		dispatch(GetActivityLogsArchiver());
	};
	const DocumentList = (page = 1) => {
		dispatch(getDocumentsList(page, selectedCompany));
	};
	const CompanyList = (page = 1) => {
		dispatch(getCompanyList(page));
	};
	useEffect(() => {
		CompanyList();
	}, []);
	useEffect(() => {
		DocumentList();
	}, [selectedCompany]);
	useEffect(() => {
		ArchiverLog();
	}, []);
	useEffect(() => {
		AreaList();
	}, []);
	useEffect(() => {
		BorrowList();
	}, []);
	useEffect(() => {
		CabinetData();
	}, [selectedCompany]);
	useEffect(() => {
		if (user === "superadmin") {
			BoxData();
		}
	}, [selectedCompany]);
	useEffect(() => {
		if (user === "superadmin") {
			BoxNoAsign();
		}
	}, [selectedCompany]);
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
			return setTitle("");
		} else if (user === "csradmin") {
			return setTitle("List Pending Approval");
		} else if (user === "csroperation") {
			return setTitle("List Pending Approval");
		} else if (user === "archiver") {
			return setTitle("");
		} else {
			return setTitle("List Box Di Pinjam");
		}
	}, []);

	const totalCabinets = cabinets?.Meta?.total;
	const totalBox = boxes?.Meta?.total;
	const totalBoxNoAsign = boxesNoAsign?.Meta?.total;
	const totalReturn = returnItems?.Meta?.total;
	const boxCustomer = borrowList?.Meta?.total;
	const totalDoc = documents?.Meta?.total;
	const totalCompany = Companys?.Meta?.total;

	const header = [
		{
			prop: "created_at",
			sortable: true,
			cellProps: {
				style: { width: "30%" },
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
				style: { width: "30%" },
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
			title: "Customer Code Box",
			prop: "custom_code_box",
			cellProps: {
				style: { width: "40%" },
			},
		},
	];

	const CardSuperAdmin = () => {
		return (
			<>
				<div className="row w-100% mh-0">
					<div className="col col-4 ph-0">
						<CardHeader
							icon="archive"
							total={totalCabinets || 0}
							text={["Total", <br />, "Lemari."]}
						/>
					</div>
					<div className="col col-4 ph-0 mh-4">
						<CardHeader
							icon="truck-loading"
							total={totalBoxNoAsign || 0}
							text={["Box tidak ", <br />, "Terdaftar."]}
						/>
					</div>
					<div className="col col-4 ph-0">
						<CardHeader
							icon="boxes"
							total={totalBox || 0}
							text={["Box", <br />, "Terdaftar."]}
						/>
					</div>
				</div>
				<div className="row w-100% mh-0 mt-4">
					<div className="col col-4 ph-0">
						<CardHeader
							icon="clone"
							total={totalDoc || 0}
							text={["Total", <br />, "Dokumen."]}
						/>
					</div>
					<div className="col col-4 ph-0 mh-4">
						<CardHeader
							icon="user-alt"
							total={totalCompany || 0}
							text={["Perusahaan", <br />, "Pengguna."]}
						/>
					</div>
					<div className="col col-4 ph-0 mh-4"></div>
				</div>
			</>
		);
	};

	const CardAdmin = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="boxes"
						total={totalBox || 0}
						text={["Jumlah", <br />, "Box."]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="archive"
						total="0"
						text={["Sisa", <br />, "Box."]}
					/>
				</div>
			</div>
		);
	};

	const CardCustomer = () => {
		return (
			<div className="row w-100% mh-0">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="archive"
						total={boxCustomer || 0}
						text={["Box", <br />, "Terdaftar."]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total={totalBoxNoAsign || 0}
						text={["Box Tidak ", <br />, "Terdaftar."]}
					/>
				</div>
				<div className="col col-4 ph-0">
					<CardHeader
						icon="truck-loading"
						total={totalReturn || 0}
						text={["Box di", <br />, "Pinjam."]}
					/>
				</div>
			</div>
		);
	};

	let dataLogArchiver: any[] = [];
	activityLogsArchiver?.map(item => {
		dataLogArchiver?.push({
			date: item.date,
			count: item.data.length,
		});
	});

	const CardArchiver = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="chalkboard"
						total={activityLogsArchiver?.length}
						text={["Total", <br />, "Entry Data"]}
					/>
				</div>
			</div>
		);
	};

	useEffect(() => {
		dispatch(GetActivityLogsSuperAdmin(selectedItem));
		dispatch(getBorrowList(1, selectedItem));
	}, [selectedItem]);

	const onChangeRC = e => {
		setSelectedItem(e.target.value);
	};

	const onChangeCompany = e => {
		setSelectedCompany(e.target.value);
	};

	const ContentSuperAdmin = (
		<>
			<div className="row w-100% mb-8">
				<div className="col col-4">
					<Form.Group className="mb-4" controlId="formBasicEmail">
						<Form.Label className="mb-4">Record Center</Form.Label>
						<Form.Select
							aria-label="Default select example"
							onChange={e => onChangeRC(e)}
							value={selectedItem}
						>
							<option value={""}>Pilih Record Center</option>
							{areaList?.map((item, i) => (
								<option value={item?.id}>{item?.name}</option>
							))}
						</Form.Select>
					</Form.Group>
				</div>
				<div className="col col-4 ph-0">
					<CardHeader
						icon="chalkboard"
						total={activityLogsSuperAdmin?.length || 0}
						text={["Total", <br />, "Entry Data."]}
					/>
				</div>
			</div>
		</>
	);
	const ContentArchiver = <></>;

	const TableCSRAdmin = () => {
		return (
			<div style={{ width: "100%" }}>
				<DataTable
					tableHeader={header}
					tableBody={requestBoxes.RequestBoxes ? requestBoxes.RequestBoxes : []}
				/>
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
					tableBody={
						approvalOperationList.RequestBoxes
							? approvalOperationList.RequestBoxes
							: []
					}
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
					tableBody={returnItems?.ReturnList ? returnItems?.ReturnList : []}
				/>
				<Pagination
					pageCount={returnItems.Meta.last_page}
					onPageChange={data => ReturnData(data.selected + 1)}
				/>
			</div>
		);
	};

	const ContentDashboard = () => {
		if (user === "superadmin") {
			return ContentSuperAdmin;
		} else if (user === "csradmin") {
			return <TableCSRAdmin />;
		} else if (user === "csroperation") {
			return <TableCSROperation />;
		} else if (user === "archiver") {
			return ContentArchiver;
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
		} else if (user === "archiver") {
			return <CardArchiver />;
		} else {
			return <CardCustomer />;
		}
	};

	return (
		<>
			<Helmet>
				<title>Dox - Dashboard Superadmin</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<div className="pos-r p-8 bg-primary-5">
				<h3 className="tc-dark-contrast mb-12 ff-1-bd">
					<span className="ff-1 username text txtf-c">Selamat Datang,</span>
					<span className="m-0 username text txtf-c"> {userName}</span>
				</h3>
				<h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
				{user === "" && (
					<div className="col col-4" style={{ paddingRight: "24px" }}>
						<Form.Group className="mb-4" controlId="formBasicEmail">
							<Form.Label className="mb-4">Record Center</Form.Label>
							<Form.Select
								aria-label="Default select example"
								onChange={e => onChangeRC(e)}
								value={selectedItem}
							>
								<option value={""}>Pilih Record Center</option>
								{areaList?.map((item, i) => (
									<option value={item?.id}>{item?.name}</option>
								))}
							</Form.Select>
						</Form.Group>
					</div>
				)}
				{user === "superadmin" && (
					<div className="col col-4" style={{ paddingRight: "24px" }}>
						<Form.Group className="mb-4" controlId="formBasicEmail">
							<Form.Label className="mb-4">Perusahaan</Form.Label>
							<Form.Select
								aria-label="Default select example"
								onChange={e => onChangeCompany(e)}
								value={selectedCompany}
							>
								<option value={""}>Pilih Perusahaan</option>
								{companyList?.map((item, i) => (
									<option value={item?.id}>{item?.name}</option>
								))}
							</Form.Select>
						</Form.Group>
					</div>
				)}
				<CardDashboard />
			</div>
			<div className="pos-r p-8 pt-0 mt-4">
				<h6 className="mb-3 pt-3">{title}</h6>
				<div className="row w-100% mh-0">
					<div className="col col-12 ph-0 mr-2">
						<ContentDashboard />
					</div>
				</div>
			</div>
		</>
	);
}
