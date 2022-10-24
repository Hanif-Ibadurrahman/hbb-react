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
// -=-=-=-=-=-
// APPROVAL
import ApprovalAdminRequestBox from "./Approval/RequestBox";
import ApprovalAdminDetail from "./Approval/RequestBox/Detail";
import ApprovalAdminPickupBox from "./Approval/PickupBox";
import { ApprovalDetail } from "./Approval/Detail";
// -=-=-=-=-=-
//ADMIN OPERATION
import ApprovalOperationRequestBox from "./AdminOperation/RequestBox";
import ApprovalPreview from "./AdminOperation/RequestBox/ApprovePreview";
import ActivityLog from "./AdminOperation/RequestBox/ActivityLog";
import IndexingDelete from "./AdminOperation/RequestBox/IndexingDelete";

// MASTER
// # - BOX
import BoxPage from "./Master/BoxPage";
import BoxPageDetail from "./Master/BoxPage/Detail";
// # - FOLDER
import FolderPage from "./Master/FolderPage";
import FolderPageDetail from "./Master/FolderPage/Detail";
// # - DOCUMENT
import DocumentPage from "./Master/DocumentPage";
import DocumentPageDetail from "./Master/DocumentPage/Detail";
// # - CABINET
import CabinetPage from "./Master/CabinetPage";
import CabinetPageDetail from "./Master/CabinetPage/Detail";
// # - AREA
import AreaPage from "./Master/AreaPage";
import AreaPageDetail from "./Master/AreaPage/Detail";
// # - ROOM
import RoomPage from "./Master/RoomPage";
import RoomPageDetail from "./Master/RoomPage/Detail";
// # - Company
import CompanyPage from "./Master/CompanyPage";
import CompanyPageDetail from "./Master/CompanyPage/Detail";
// # - CAR
import CarPage from "./Master/CarPage";
import CarPageDetail from "./Master/CarPage/Detail";
// # - DIVISI
import DivisionPage from "./Master/DivisionPage";
import DivisionPageDetail from "./Master/DivisionPage/Detail";
// # - CUSTOMER
import CustomerPage from "./Master/CustomerPage";
import CustomerPageDetail from "./Master/CustomerPage/Detail";
// # -STAFF
import StaffPage from "./Master/StaffPage";
// # - INDEXING
import IndexingPage from "./Master/indexing";
import DetailIndexingPage from "./Master/indexing/Detail";
import AssignDocToFolder from "./Master/indexing/AssignDocToFolder";
import AssignFolderToBox from "./Master/indexing/AssignFolderToBox";
import DetailIndexingNotAssign from "./Master/indexing/Detail/DetailNoAssign";
// # - CLASSIFICATION
import ClassificationPage from "./Master/ClassificationPage";
import DetailClassificationPage from "./Master/ClassificationPage/Detail";
// -=-=-=-=-=-

// CUSTOMER
//1 - REQUEST BOX
import RequestBox from "./Customer/RequestBox";
//2 - Borrow
import BorrowBoxPage from "./Customer/BorrowBox";
//3 - Pick Up
import PickUpPage from "./Customer/PickUpBox";
//4 - Return
import ReturnItemPage from "./Customer/ReturnItem";
//5 - History of Request
import RequestHistory from "./Customer/RequestHistory";

// -=-=-=-=-=-
// ALL USER
import { UserProfile } from "./ProfilePage/Loadable";
import PrintBoxPerPage from "./Master/BoxPage/PrintPerPage";

export function Routes() {
	const { i18n } = useTranslation();
	return (
		<BrowserRouter>
			<Helmet
				titleTemplate="%s"
				defaultTitle="DOX"
				htmlAttributes={{ lang: i18n.language }}
			>
				<meta name="description" content="A DOX application" />
			</Helmet>
			<div className="d-flex all-wrapper">
				<Sidebar />

				<div className="content-wrapper w-80%">
					<NavBar />
					<Switch>
						{/*---------- DASHBOARD ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Dashboard"}
							component={DashboardSuperadmin}
						/>
						{/*---------- DASHBOARD - - - END ---------*/}

						{/*---------- ACTIVITY LOG ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Activity-Log"}
							component={ActivityLog}
						/>
						{/*---------- ACTIVITY LOG - - - END ---------*/}

						{/*---------- INDEXING ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Indexing"}
							component={IndexingPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/IndexingDetail/:id"}
							component={DetailIndexingPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Indexing-Delete"}
							component={IndexingDelete}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/AssignDocToFolder"}
							component={AssignDocToFolder}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/AssignFolderToBox"}
							component={AssignFolderToBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/DetailIndexing/:id"}
							component={DetailIndexingNotAssign}
						/>
						{/*---------- INDEXING - - - END ---------*/}

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
						<Route
							path={process.env.PUBLIC_URL + "/Approval-Admin/PickupBox"}
							component={ApprovalAdminPickupBox}
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
							path={process.env.PUBLIC_URL + "/Company"}
							component={CompanyPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Company-Detail/:id"}
							component={CompanyPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/CustomerPage"}
							component={CustomerPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Customer-Detail/:id"}
							component={CustomerPageDetail}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/StaffPage"}
							component={StaffPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/ClassificationPage"}
							component={ClassificationPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Classification-Detail/:id"}
							component={DetailClassificationPage}
						/>
						{/*---------- MASTER - - - END ---------*/}
						{/*--------- ADMIN CSR ---------*/}

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
						<Route
							path={process.env.PUBLIC_URL + "/Customer/Return"}
							component={ReturnItemPage}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Customer/History"}
							component={RequestHistory}
						/>

						{/*--------- ALL USER ---------*/}
						<Route
							path={process.env.PUBLIC_URL + "/Profile/"}
							component={UserProfile}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Print-PerPage"}
							component={PrintBoxPerPage}
						/>
						{/*--------- ADMIN RC ---------*/}

						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</div>
			<GlobalStyle />
		</BrowserRouter>
	);
}
