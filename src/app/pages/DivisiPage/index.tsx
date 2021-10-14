import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { StyleConstants } from "styles/StyleConstants";
import { DataTables } from "./DataTables";
import { ModalDivisi } from "./components/Modaldivisi";
import React, { useState } from "react";
import Breadcrumb from "app/components/BreadCrumb";

export function DivisiPage() {
	const [crumbs, setCrumbs] = useState(["Dashboard", "DivisiPage"]);
	return (
		<>
			<Helmet>
				<title>Divisi Page</title>
				<meta name="description" content="Accordions" />
			</Helmet>
			<div className="pos-r p-8">
				<div className="d-flex jc-between ai-center mb-4">
					<Breadcrumb crumbs={crumbs} selected />
					<ModalDivisi />
				</div>
				<DataTables />
			</div>
		</>
	);
}

const Wrapper = styled.div`
	height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 320px;
`;
