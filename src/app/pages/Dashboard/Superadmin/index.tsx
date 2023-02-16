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
import { Button, Dropdown, Form } from "react-bootstrap";
import { selectAreas } from "store/Selector/AreaSelector";
import { getAreasList } from "actions/AreaActions";
import {
	selectActivityLog,
	selectActivityLogs,
	selectActivityLogsArchiver,
	selectDashboardSummary,
} from "store/Selector/ActivityLogSelector";
import {
	GetActivityLogsArchiver,
	GetActivityLogsSuperAdmin,
	getSummaryDashboard,
} from "actions/ActivityLogAction";
import { getDocumentsList } from "actions/DocumentAction";
import { selectDocuemnts } from "store/Selector/DocumentSelector";
import { selectCompanys } from "store/Selector/CompanySelector";
import { getCompanyList } from "actions/CompanyAction";
import { getAllSummarySlot } from "api/cabinets";

export function DashboardSuperadmin() {
	const user = localStorage.getItem("User");
	const userName = localStorage.getItem("UserName");
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const cabinets = useSelector(selectCabinets);
	const returnItems = useSelector(selectReturnItems);
	const approvalOperationList = useSelector(selectApprovalList);
	const borrowList = useSelector(selectBorrowItems);
	const activityLogsArchiver = useSelector(selectActivityLogsArchiver);
	const areas = useSelector(selectAreas);
	const summary = useSelector(selectDashboardSummary);
	const areaList = areas?.Areas;
	const Companys = useSelector(selectCompanys);
	const companyList = Companys.Companys as any;
	const [title, setTitle] = useState("");
	const [selectedItem, setSelectedItem] = useState("");
	const [selectedCompany, setSelectedCompany] = useState("");
	const [summaryCabinetSlot, setSummaryCabinetSlot] = useState(0);

	const SummaryData = (page = 1) => {
		dispatch(getSummaryDashboard(selectedCompany, selectedItem));
	};
	useEffect(() => {
		SummaryData();
	}, [selectedCompany, selectedItem]);

	const ReturnData = (page = 1) => {
		dispatch(getReturnList(page));
	};
	const ApprovalDataCSRAdmin = (page = 1) => {
		dispatch(getRequestBoxesList(page));
	};
	const FetchData = (page = 1) => {
		dispatch(getAllConfirmedAdmin(page));
	};
	const AreaList = (page = 1) => {
		dispatch(getAreasList(page, selectedCompany));
	};

	const CompanyList = (page = 1) => {
		dispatch(getCompanyList(page));
	};
	useEffect(() => {
		CompanyList();
	}, []);

	useEffect(() => {
		AreaList();
	}, [selectedCompany]);

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

	const SummarySlot = async () => {
		try {
			const res = await getAllSummarySlot(selectedItem);
			setSummaryCabinetSlot(res?.data?.free_cabinet_slot);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		SummarySlot();
	}, [selectedItem]);

	const totalCabinets = summary?.total_cabinets;
	const totalBox = summary?.filled_boxes;
	const totalBoxNoAsign = summary?.free_boxes;
	const totalReturn = returnItems?.Meta?.total;
	const boxCustomer = borrowList?.Meta?.total;
	const totalDoc = summary?.total_documents;
	const totalCompany = summary?.total_companies;
	const totalCabinetSlot = summary?.total_cabinet_slots;

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
			title: "Kode Box",
			prop: "code_box",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Custome Kode Box",
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
				<div className="row w-100% mh-0 row-summary mt-4">
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
					<div className="col col-4 ph-0">
						<CardHeader
							icon="cabinet-filing"
							total={totalCabinetSlot || 0}
							text={["Slot Lemari", <br />, "Kosong"]}
						/>
					</div>
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
		// dispatch(GetActivityLogsSuperAdmin(selectedItem));
		dispatch(getBorrowList(1, selectedItem));
	}, [selectedItem]);

	const onChangeRC = e => {
		setSelectedItem(e.target.value);
	};

	const onChangeCompany = e => {
		setSelectedCompany(e.target.value);
	};
	const mapFreeCabinet = cabinets?.Cabinets?.map(item => {
		return item?.free_cabinet_slot;
	});

	let freeCabinetSlot = 0;
	mapFreeCabinet?.forEach(item => {
		var newDataFree = item !== undefined && item !== null ? item : 0;
		freeCabinetSlot += newDataFree;
	});

	const ContentSuperAdmin = <></>;
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
				<div className="row mb-4" style={{ alignItems: "center" }}>
					<div className="col-4">
						<h6 className="mb-3 tc-dark-contrast">Ringkasan Hari Ini</h6>
					</div>
				</div>
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
					<div className="row w-100% mb-8">
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
