import { Helmet } from "react-helmet-async";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dashboard } from "./pages/Dashboard";

export function App() {
	const { i18n } = useTranslation();
	localStorage.getItem("User");

	return (
		<BrowserRouter>
			<Helmet
				titleTemplate="%s"
				defaultTitle="HBB"
				htmlAttributes={{ lang: i18n.language }}
			>
				<meta name="description" content="HBB application" />
			</Helmet>

			<Switch>
				<Route path={process.env.PUBLIC_URL + "/"} component={Dashboard} />
			</Switch>
		</BrowserRouter>
	);
}
