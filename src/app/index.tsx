import { Helmet } from "react-helmet-async";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dashboard } from "./pages/Dashboard";
import { MasterBarang } from "./pages/Master/MasterBarang";

export function App() {
	const { i18n } = useTranslation();
	localStorage.getItem("User");

	return (
		<BrowserRouter>
			<Switch>
				{/* <Route path={process.env.PUBLIC_URL + "/"} component={Dashboard} /> */}
				<Route path={process.env.PUBLIC_URL + "/"} component={MasterBarang} />
				<Route
					path={process.env.PUBLIC_URL + "/master/barang"}
					component={MasterBarang}
				/>
			</Switch>
		</BrowserRouter>
	);
}
