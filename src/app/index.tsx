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

import { GlobalStyle } from "../styles/global-styles";

import { useTranslation } from "react-i18next";
import { LoginPage } from "./pages/LoginPage";
import { Routes } from "./pages/Routes";

import PrintBox from "../app/pages/Master/BoxPage/print";
import PrintCabinet from "./pages/Master/CabinetPage/print";
import ApprovalPrint from "./pages/AdminOperation/RequestBox/PrintBarcode";
import PrintBoxPerpage from "./pages/Master/BoxPage/PrintPerPage";
import DeliveryNote from "./pages/Customer/RequestHistory/deliveryNote";
import manualBookSuperAdmin from "assets/documents/ManualBook-RoleSuperAdmin.pdf";
import manualBookCSRAdmin from "assets/documents/ManualBook-RoleCSRAdmin.pdf";
import manualBookCSROperation from "assets/documents/ManualBook-RoleCSROperation.pdf";
import manualBookArchiver from "assets/documents/ManualBook-RoleArchiver.pdf";
import manualBookCustomer from "assets/documents/ManualBook-RoleCustomer.pdf";
import "./pages/Dashboard/dashboard.scoped.scss";

export function App() {
	const { i18n } = useTranslation();
	const user = localStorage.getItem("User");
	const [manualBook, setManualBook] = React.useState("");
	React.useEffect(() => {
		if (user === "superadmin") {
			return setManualBook(manualBookSuperAdmin);
		} else if (user === "csradmin") {
			return setManualBook(manualBookCSRAdmin);
		} else if (user === "csroperation") {
			return setManualBook(manualBookCSROperation);
		} else if (user === "archiver") {
			return setManualBook(manualBookArchiver);
		} else {
			return setManualBook(manualBookCustomer);
		}
	}, [user]);
	return (
		<BrowserRouter>
			<Helmet
				titleTemplate="%s"
				defaultTitle="Test"
				htmlAttributes={{ lang: i18n.language }}
			>
				<meta name="description" content="Dox application" />
			</Helmet>
			<div className="d-flex all-wrapper">
				<div className="content-wrapper w-100%">
					<a
						href={manualBook}
						download={`Manual Book - Aplikasi Dox : Role - ${
							user || "customer"
						}`}
						target={"_blank"}
						rel="noreferrer"
						className="pv-4 ph-4 manual-book"
					>
						Panduan Aplikasi <i className="fas fa-book-reader"></i>
					</a>
					<Switch>
						<Route
							path={process.env.PUBLIC_URL + "/Print-Barcode/:id"}
							component={PrintBox}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Print-Cabinet/:id"}
							component={PrintCabinet}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Print-Approval/:id"}
							component={ApprovalPrint}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/Login"}
							component={LoginPage}
						/>
						{/* <Route
							path={process.env.PUBLIC_URL + "/Print-PerPage"}
							component={PrintBoxPerpage}
						/> */}
						<Route
							path={process.env.PUBLIC_URL + "/Customer/DeliveryNote/:id"}
							component={DeliveryNote}
						/>
						<Route
							path={process.env.PUBLIC_URL + "/"}
							component={user === null ? LoginPage : Routes}
						/>
					</Switch>
				</div>
			</div>
			<GlobalStyle />
		</BrowserRouter>
	);
}
