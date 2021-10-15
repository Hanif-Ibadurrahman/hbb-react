import * as React from "react";
import { Helmet } from "react-helmet-async";
import { DataTables } from "./DataTables";
import { Header } from "./Header";

export function DocumentPage() {
	return (
		<>
			<Helmet>
				<title>Request Document</title>
				<meta name="description" content="Request Document" />
			</Helmet>
			<div className="pos-r p-8">
				<Header />
				<DataTables />
			</div>
		</>
	);
}
