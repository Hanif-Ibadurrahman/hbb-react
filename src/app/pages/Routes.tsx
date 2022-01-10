/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "../../styles/global-styles";

import { Sidebar } from "../components/Sidebar";
import { NavBar } from "../components/NavBar";
// --=-=-=-=-=-=- BIOLERPLATE EXAMPLE -=-=-=-=-=-=-=-
import { NotFoundPage } from "./NotFoundPage/Loadable";
// import { Accordions } from "./UIElements/Accordions/Loadable";
import { useTranslation } from "react-i18next";
// --=-=-=-=-=-=- BIOLERPLATE EXAMPLE -=-=-=-=-=-=-=-

// DASHBOARD
import { DashboardSuperadmin } from "./Dashboard/Superadmin";
import { DashboardAdminCSR } from "./Dashboard/AdminCSR";
import { DashboardAdminRC } from "./Dashboard/AdminRC";
import { DashboardAdminTransport } from "./Dashboard/AdminTransport";
// -=-=-=-=-=-
// APPROVAL
import ApprovalAdminRequestBox from "./Approval/RequestBox";
import ApprovalAdminDetail from "./Approval/RequestBox/Detail";
// import ApprovalPickupBox from "./Approval/PickupBox";
import ApprovalAdminPickupBox from "./Approval/PickupBox";
import { ApprovalPinjamItem } from "./Approval/PinjamItem";
import { ApprovalPengembalianItem } from "./Approval/PengembalianItem";
import { ApprovalDetail } from "./Approval/Detail";
// -=-=-=-=-=-
//ADMIN OPERATION
import ApprovalOperationRequestBox from "./AdminOperation/RequestBox";
import ApprovalPreview from "./AdminOperation/RequestBox/ApprovePreview";

// MASTER
// 1 - BOX
import BoxPage from "./Master/BoxPage";
import BoxPageDetail from "./Master/BoxPage/Detail";
// 2 - FOLDER
import FolderPage from "./Master/FolderPage";
import FolderPageDetail from "./Master/FolderPage/Detail";
// 3 - DOCUMENT
import DocumentPage from "./Master/DocumentPage";
import DocumentPageDetail from "./Master/DocumentPage/Detail";
// 4 - CABINET
import CabinetPage from "./Master/CabinetPage";
import CabinetPageDetail from "./Master/CabinetPage/Detail";
// 4 - AREA
import AreaPage from "./Master/AreaPage";
import AreaPageDetail from "./Master/AreaPage/Detail";
// 5 - BERKAS
import { BerkasPage } from "./Master/BerkasPage";
import { BerkasPageDetail } from "./Master/BerkasPage/Detail";
// 6 - ROOM
import RoomPage from "./Master/RoomPage";
import RoomPageDetail from "./Master/RoomPage/Detail";
// 7 - Company
import CompanyPage from "./Master/CompanyPage";
import CompanyPageDetail from "./Master/CompanyPage/Detail";
// 7 - CAR
import CarPage from "./Master/CarPage";
import CarPageDetail from "./Master/CarPage/Detail";
//8 - DIVISI
import DivisionPage from "./Master/DivisionPage";
import DivisionPageDetail from "./Master/DivisionPage/Detail";
// 8 - USER TRANSPORTER
import TransporterPage from "./Master/Staff/TransporterPage";
// 9 - USER ARCHIVER
import ArchiverPage from "./Master/Staff/ArchiverPage";
// 10 - CUSTOMER
import CustomerPage from "./Master/CustomerPage";

// import { FolderPage } from "./Master/FolderPage";
// -=-=-=-=-=-
import { DataTables } from "./Tables/DataTable/Loadable";
// import { BoxPage } from "./BoxPage";
import { DetailBox } from "./BoxPage/Detail";
import { EditBox } from "./BoxPage/Edit";
import { TimeLine } from "./TimeLinePage/Loadable";
// import { AreaPage } from "./AreaPage/Loadable";
import { EditArea } from "./AreaPage/Edit";
import { DivisiPage } from "./DivisiPage/Loadable";
import { EditDevisi } from "./DivisiPage/Edit";
// import { CabinetPage } from "./CabinetPage/Loadable";
import { VehiclePage } from "./VehiclePage/Loadable";
import { EditVehicle } from "./VehiclePage/Edit";
//ADMIN CSR
import { ApprovalBoxPage } from "./AdminCSR/BoxPage/Loadable";
import { DetailBoxCSR } from "./AdminCSR/BoxPage/Detail";
import { EditBoxCSR } from "./AdminCSR/BoxPage/Edit";

// -=-=-=-=-=-

// CUSTOMER
//1 - REQUEST BOX
import RequestBox from "./Customer/RequestBox";
//2 - Borrow
import BorrowBoxPage from "./Customer/BorrowBox";
//3 - Pick Up
import PickUpPage from "./Customer/PickUpBox";

// -=-=-=-=-=-
// ALL USER
import { UserProfile } from "./ProfilePage/Loadable";
//ADMIN RC
import { AssignBoxPage } from "./AdminRC/BoxPage";
import { DetailBoxRC } from "./AdminRC/BoxPage/Detail";
import { EditBoxRC } from "./AdminRC/BoxPage/Edit";

export function Routes() {
	const { i18n } = useTranslation();
	return (
		<BrowserRouter>
			<Helmet
				titleTemplate="%s - React Boilerplate"
				defaultTitle="React Boilerplate"
				htmlAttributes={{ lang: i18n.language }}
			>
				<meta name="description" content="A React Boilerplate application" />
			</Helmet>
			<div className="d-flex all-wrapper">
				<Sidebar />

				<div className="content-wrapper w-80%">
					<NavBar />
					<Switch>
						{/*---------- DASHBOARD ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Dashboard/Superadmin"}
							component={DashboardSuperadmin}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Dashboard/CSR"}
							component={DashboardAdminCSR}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Dashboard/RC"}
							component={DashboardAdminRC}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Dashboard/Transport"}
							component={DashboardAdminTransport}
						/>
						{/*---------- DASHBOARD - - - END ---------*/}

						{/*---------- APPROVAL ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Approval-Admin"}
							component={ApprovalAdminRequestBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/DetailRequestBox/:id"}
							component={ApprovalAdminDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Approval-Operation"}
							component={ApprovalOperationRequestBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Preview-Approvral"}
							component={ApprovalPreview}
						/>
						{/* <Route
							path={process.env.PUBLIC_URL + "/Approval/PickupBox"}
							component={ApprovalPickupBox}
						/> */}
						<Route
							path={process.env.PUBLIC_URL + "/Approval-Admin/PickupBox"}
							component={ApprovalAdminPickupBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Approval/PinjamItem"}
							component={ApprovalPinjamItem}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Approval/PengembalianItem"}
							component={ApprovalPengembalianItem}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Approval/Detail"}
							component={ApprovalDetail}
						/>
						{/*---------- APPROVAL - - - END ---------*/}

						{/*---------- MASTER ---------*/}
						<Route path={process.env.PUBLIC_URL + "/Box"} component={BoxPage} />
						<Route path={process.env.PUBLIC_URL + "/Car"} component={CarPage} />
						<Route
							path={process.env.PUBLIC_URL + "/Car-Detail/:id"}
							component={CarPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Box-Detail/:id"}
							component={BoxPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Folder"}
							component={FolderPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Folder-Detail/:id"}
							component={FolderPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Cabinet"}
							component={CabinetPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Cabinet-Detail/:id"}
							component={CabinetPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Document"}
							component={DocumentPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Document-Detail/:id"}
							component={DocumentPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Area"}
							component={AreaPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Area-Detail/:id"}
							component={AreaPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Berkas"}
							component={BerkasPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Berkas-Detail"}
							component={BerkasPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Room"}
							component={RoomPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Room-Detail/:id"}
							component={RoomPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/DivisionPage"}
							component={DivisionPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/DivisionPage-Detail/:id"}
							component={DivisionPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/DivisionPage/Edit"}
							component={EditDevisi}
						/>
						{/* <Route
							path={process.env.PUBLIC_URL + "/Folder"}
							component={FolderPage}
						/> */}
						<Route
							path={process.env.PUBLIC_URL + "/Company"}
							component={CompanyPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Company-Detail/:id"}
							component={CompanyPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Trasnporter"}
							component={TransporterPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Archiver"}
							component={ArchiverPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/CustomerPage"}
							component={CustomerPage}
						/>
						{/*---------- MASTER - - - END ---------*/}

						<Route
							path={process.env.PUBLIC_URL + "/Table/DataTables"}
							component={DataTables}
						/>
						{/* <Route
							path={process.env.PUBLIC_URL + "/BoxPage"}
							component={BoxPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Box/Detail"}
							component={DetailBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Box/Edit"}
							component={EditBox}
						/> */}
						<Route
							path={process.env.PUBLIC_URL + "/Timeline"}
							component={TimeLine}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/AreaPage"}
							component={AreaPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Area/Edit"}
							component={EditArea}
						/>

						<Route
							path={process.env.PUBLIC_URL + "/LemariPage"}
							component={CabinetPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/VehiclePage"}
							component={VehiclePage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Vehicle/EditVehicle"}
							component={EditVehicle}
						/>
						{/*--------- ADMIN CSR ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/ApprovalBox"}
							component={ApprovalBoxPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/CSR/DetailBox"}
							component={DetailBoxCSR}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/CSR/EditBox"}
							component={EditBoxCSR}
						/>

						{/*---------- CUSTOMER ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Customer/Borrow-Box"}
							component={BorrowBoxPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Customer/Request-Box"}
							component={RequestBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Customer/Pick-Up"}
							component={PickUpPage}
						/>

						{/*--------- ALL USER ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Profile/"}
							component={UserProfile}
						/>
						{/*--------- ADMIN RC ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/AssignBox/"}
							component={AssignBoxPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/RC/DetailBox/"}
							component={DetailBoxRC}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/RC/EditBox/"}
							component={EditBoxRC}
						/>
						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</div>
			<GlobalStyle />
		</BrowserRouter>
	);
}
