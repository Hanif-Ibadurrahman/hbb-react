import React, { useState, useEffect } from "react";
import Logo from "assets/images/logo.png";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./sidebar.scoped.scss";
import "react-pro-sidebar/dist/css/styles.css";
import {
	DashboardData,
	PeminjamanData,
	MasterData,
	CustomerMasterData,
	ApprovalOperation,
} from "./SidebarData";
import IconHome from "assets/images/icon/icon-1.png";
import IconUI from "assets/images/icon/icon-2.png";
import IconAdvanced from "assets/images/icon/icon-3.png";
import IconForm from "assets/images/icon/icon-4.png";
import IconTable from "assets/images/icon/icon-5.png";
import {
	selectApprovalList,
	selectRequestBoxes,
} from "store/Selector/RequestBoxSelector";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllConfirmedAdmin,
	getRequestBoxesList,
	SearchApprovalAdmin,
} from "actions/RequestBoxAction";

export function Sidebar() {
	const [isActive] = useState<boolean>(true);
	const [role, setRole] = useState("");

	const user = localStorage.getItem("User");

	useEffect(() => {
		switch (user) {
			case "superadmin":
				setRole("admin");
				break;
			case "csradmin":
				setRole("csradmin");
				break;
			case "csroperation":
				setRole("csroperation");
				break;
			default:
				setRole("customer");
		}
	}, [user]);

	const dispatch = useDispatch();
	const requestBoxes = useSelector(selectApprovalList);
	const csrOperation = (page = 1) => {
		dispatch(getAllConfirmedAdmin(page));
	};

	useEffect(() => {
		csrOperation();
	}, []);

	const csrAdmin = (page = 1) => {
		if (requestBoxes.RequestBoxes.length === 0) {
			dispatch(getRequestBoxesList(page));
		} else {
			dispatch(SearchApprovalAdmin);
		}
	};

	useEffect(() => {
		csrAdmin();
	}, []);

	const notifCSROperation = requestBoxes.CSROperationNotif.total;
	const notifCSRAdmin = requestBoxes.CSRAdminNotif.total;
	const CustomerMenu = () => {
		return (
			<>
				<MenuItem
					id={window.location.pathname === "/Dashboard" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconHome} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Dashboard";
					}}
				>
					{""} Beranda
				</MenuItem>
				<MenuItem
					id={
						window.location.pathname === "/Customer/Request-Box" ? "active" : ""
					}
					className=" pos-r"
					icon={<img src={IconAdvanced} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Customer/Request-Box";
					}}
				>
					{""} Request Box
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "/Customer/Pick-Up" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Customer/Pick-Up";
					}}
				>
					{""} Pick Up
				</MenuItem>
				<MenuItem
					id={
						window.location.pathname === "/Customer/Borrow-Box" ? "active" : ""
					}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Customer/Borrow-Box";
					}}
				>
					{""} Peminjaman
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "/Customer/Return" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconUI} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Customer/Return";
					}}
				>
					{""} Pengembalian
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "Customer/History" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconTable} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "Customer/History";
					}}
				>
					{""} Riwayat Permintaan
				</MenuItem>
			</>
		);
	};

	const AdminMenu = () => {
		return (
			<>
				<MenuItem
					id={window.location.pathname === "/Dashboard" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconHome} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Dashboard";
					}}
				>
					{""} Dashboard
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "/Approval-Admin" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconUI} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Approval-Admin";
					}}
				>
					{" "}
					<div
						className="d-flex jc-between ai-center"
						style={{ minWidth: "100%" }}
					>
						<div>Approval Admin</div>
						<div className="pv-2 ph-3 bd-rs-5 bg-primary-5">
							{notifCSRAdmin || 0}
						</div>
					</div>
				</MenuItem>
				<MenuItem
					id={
						window.location.pathname === "/Approval-Operation" ? "active" : ""
					}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Approval-Operation";
					}}
				>
					<div
						className="d-flex jc-between ai-center"
						style={{ minWidth: "100%" }}
					>
						<div>Approval Operation</div>
						<div className="pv-2 ph-3 bd-rs-5 bg-primary-5">
							{notifCSROperation || 0}
						</div>
					</div>
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "/Preview-Approvral" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Preview-Approvral";
					}}
				>
					{""} Riwayat Approval
				</MenuItem>
				<SubMenu
					className=""
					icon={<img src={IconAdvanced} className="h-5" alt="awSnap" />}
					title="Master"
				>
					{MasterData.map((val, key) => {
						return (
							<MenuItem
								id={
									window.location.pathname.split(val.link).pop() ? "" : "active"
								}
								className="pos-r"
								icon={<img src={val.icon} className="h-5" alt="awSnap" />}
								key={key}
								onClick={() => {
									window.location.pathname = val.link;
								}}
							>
								{""}
								{val.title}
							</MenuItem>
						);
					})}
				</SubMenu>
				<MenuItem
					id={window.location.pathname === "/Activity-Log" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Activity-Log";
					}}
				>
					{""} Activity Log
				</MenuItem>
			</>
		);
	};

	const CsrAdminMenu = () => {
		return (
			<>
				<MenuItem
					id={window.location.pathname === "/Dashboard" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconHome} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Dashboard";
					}}
				>
					{""} Dashboard
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "/Approval-Admin" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconUI} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Approval-Admin";
					}}
				>
					<div
						className="d-flex jc-between ai-center"
						style={{ minWidth: "100%" }}
					>
						<div>Approval Request</div>
						<div className="pv-2 ph-3 bd-rs-5 bg-primary-5">
							{notifCSRAdmin || 0}
						</div>
					</div>
				</MenuItem>
			</>
		);
	};

	const CsrOperationMenu = () => {
		return (
			<>
				<MenuItem
					id={window.location.pathname === "/Dashboard" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconHome} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Dashboard";
					}}
				>
					{""} Dashboard
				</MenuItem>
				<MenuItem
					id={
						window.location.pathname === "/Approval-Operation" ? "active" : ""
					}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Approval-Operation";
					}}
				>
					{" "}
					<div
						className="d-flex jc-between ai-center"
						style={{ minWidth: "100%" }}
					>
						<div>Approval Request</div>
						<div className="pv-2 ph-3 bd-rs-5 bg-primary-5">
							{notifCSROperation || 0}
						</div>
					</div>
				</MenuItem>
				<MenuItem
					id={window.location.pathname === "/Preview-Approvral" ? "active" : ""}
					className=" pos-r"
					icon={<img src={IconForm} className="h-5" alt="awSnap" />}
					onClick={() => {
						window.location.pathname = "/Preview-Approvral";
					}}
				>
					{""} Riwayat Approval
				</MenuItem>
			</>
		);
	};

	const SideBarMenu = () => {
		if (role === "admin") {
			return <AdminMenu />;
		} else if (role === "csradmin") {
			return <CsrAdminMenu />;
		} else if (role === "csroperation") {
			return <CsrOperationMenu />;
		} else {
			return <CustomerMenu />;
		}
	};

	return (
		<div className={`sidebar bg-medium-tint w-20% ${isActive ? "" : "icon"}`}>
			<div className="sidebar-header">
				<div className="ph-4 h-20 bg-dark-contrast d-flex ai-center">
					<img src={Logo} alt="Logo" className="h-16" />
				</div>
			</div>
			<ProSidebar>
				<Menu iconShape="square">
					{/* {role === "admin" ? <AdminMenu /> : <CustomerMenu />} */}
					<SideBarMenu />
				</Menu>
				{/* <div className="w-8 h-8 bd-rs-6 d-flex jc-center ai-center ml-a mr-a pos-r p-2 bg-warning-3 btn-sidebar cur-p" onClick={handleToggle}><i className="fas fa-chevron-left"></i></div> */}
			</ProSidebar>
		</div>
	);
}
