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
import { useTranslation } from "react-i18next";

export const Routes = () => {
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
		</BrowserRouter>
	);
};
