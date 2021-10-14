import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";

const header = [
	{
		title: "Code Box",
		prop: "CodeBox",
		sortable: true,
		cellProps: {
			style: { width: "40%" },
		},
	},
	{
		title: "Tanggal",
		prop: "Tanggal",
		sortable: true,
		cellProps: {
			style: { background: "#fafafa", width: "40%" },
			className: "realname-class",
		},
	},
	{
		title: "Action",
		prop: "Action",
		cellProps: {
			style: { flex: 1 },
			className: "realname-class",
		},
	},
];

const body = Array.from(new Array(30), () => {
	const rd = (Math.random() * 10).toFixed(2);

	return {
		CodeBox: `A1232${rd}`,
		Tanggal: "05 - 09 - 21",
		Waktu: "09:52 WIB",
		Quantity: Math.floor(Math.random() * 10) + 1,
		Action: <DropdownAction />,
	};
});

export function BoxPage() {
	return (
		<>
			<Helmet>
				<title>Dox - Persutujuan Request Box</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<PageHeader breadcrumb={["Master", "Box"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={body} />
			</PageWrapper>
		</>
	);
}
