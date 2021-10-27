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
import { HomePage } from "./HomePage/Loadable";
import { NotFoundPage } from "./NotFoundPage/Loadable";
import { Accordions } from "./UIElements/Accordions/Loadable";
import { useTranslation } from "react-i18next";
// --=-=-=-=-=-=- BIOLERPLATE EXAMPLE -=-=-=-=-=-=-=-

// DASHBOARD
import { DashboardSuperadmin } from "./Dashboard/Superadmin";
import { DashboardAdminCSR } from "./Dashboard/AdminCSR";
import { DashboardAdminRC } from "./Dashboard/AdminRC";
import { DashboardAdminTransport } from "./Dashboard/AdminTransport";
// -=-=-=-=-=-
// APPROVAL
import { ApprovalRequestBox } from "./Approval/RequestBox";
import { ApprovalPickupBox } from "./Approval/PickupBox";
import { ApprovalPinjamItem } from "./Approval/PinjamItem";
import { ApprovalPengembalianItem } from "./Approval/PengembalianItem";
import { ApprovalDetail } from "./Approval/Detail";
// -=-=-=-=-=-
// MASTER
// 1 - BOX
import { BoxPage } from "./Master/BoxPage";
import { BoxPageDetail } from "./Master/BoxPage/Detail";
// 2 - FOLDER
import { FolderPage } from "./Master/FolderPage";
import { FolderPageDetail } from "./Master/FolderPage/Detail";
// 3 - DOCUMENT
import { DocumentPage } from "./Master/DocumentPage";
import { DocumentPageDetail } from "./Master/DocumentPage/Detail";
// 4 - CABINET
import { CabinetPage } from "./Master/CabinetPage";
import { CabinetPageDetail } from "./Master/CabinetPage/Detail";
// 4 - AREA
import { AreaPage } from "./Master/AreaPage";
import { AreaPageDetail } from "./Master/AreaPage/Detail";
// 5 - BERKAS
import { BerkasPage } from "./Master/BerkasPage";
import { BerkasPageDetail } from "./Master/BerkasPage/Detail";

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
import { EditLemari } from "./CabinetPage/Edit";
import { VehiclePage } from "./VehiclePage/Loadable";
import { EditVehicle } from "./VehiclePage/Edit";
//ADMIN CSR
import { ApprovalBoxPage } from "./AdminCSR/BoxPage/Loadable";
import { DetailBoxCSR } from "./AdminCSR/BoxPage/Detail";
import { EditBoxCSR } from "./AdminCSR/BoxPage/Edit";
// -=-=-=-=-=-
// CUSTOMER
import { BorrowBoxPage } from "./Customer/BorrowBox/Loadable";
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
							path={process.env.PUBLIC_URL + "/Approval/RequestBox"}
							component={ApprovalRequestBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Approval/PickupBox"}
							component={ApprovalPickupBox}
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
						<Route
							path={process.env.PUBLIC_URL + "/Box-Detail"}
							component={BoxPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Folder"}
							component={FolderPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Folder-Detail"}
							component={FolderPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Cabinet"}
							component={CabinetPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Cabinet-Detail"}
							component={CabinetPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Document"}
							component={DocumentPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Document-Detail"}
							component={DocumentPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Area"}
							component={AreaPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Area-Detail"}
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
						{/* <Route
							path={process.env.PUBLIC_URL + "/Folder"}
							component={FolderPage}
						/> */}
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
							path={process.env.PUBLIC_URL + "/DivisiPage"}
							component={DivisiPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Divisi/Edit"}
							component={EditDevisi}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/LemariPage"}
							component={CabinetPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Lemari/Edit"}
							component={EditLemari}
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
