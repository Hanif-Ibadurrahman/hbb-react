import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../approval.scoped.scss";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import StatusApproval from "../Components/StatusApproval";
import DropdownAction from "../Components/DropdownAction";

const header = [
	{
		title: "Code Box",
		prop: "CodeBox",
		sortable: true,
		cellProps: {
			style: { width: "20%" },
		},
	},
	{
		title: "Tanggal",
		prop: "Tanggal",
		sortable: true,
		// Add classes and styles by objects and strings.
		cellProps: {
			style: { background: "#fafafa", width: "20%" },
			className: "realname-class",
		},
	},
	{
		title: "Waktu",
		prop: "Waktu",
		sortable: true,
		cellProps: {
			style: { background: "#fafafa", width: "20%" },
			className: "realname-class",
		},
	},
	{
		title: "Quantity",
		prop: "Quantity",
		sortable: true,
		cellProps: {
			style: { width: "15%" },
		},
	},
	{
		title: "Status",
		prop: "Status",
		sortable: true,
		cellProps: {
			style: { width: "15%" },
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

const body = Array.from(new Array(5), () => {
	const rd = (Math.random() * 10).toFixed(10);
	var statusArray = ["waiting", "approved", "declined"];
	var statusMoreArray = [
		"Menunggu disetujui Admin CSR.",
		"Telah disetujui Admin CSR.",
		"Tidak disetujui Admin CSR.",
	];
	var randomStatus =
		statusArray[Math.floor(Math.random() * statusArray.length)];

	return {
		CodeBox: `A000000${rd}`,
		Tanggal: "05 - 09 - 21",
		Waktu: "09:52 WIB",
		Quantity: Math.floor(Math.random() * 10) + 1,
		Status: <StatusApproval status={randomStatus} tooltip={statusMoreArray} />,
		Action: <DropdownAction />,
	};
});

export function ApprovalPengembalianItem() {
	return (
		<>
			<Helmet>
				<title>Dox - Persutujuan Pengembalian Item</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<PageHeader
					breadcrumb={["Dashboard", "Approval", "Pengembalian Item"]}
				/>
				<DataTable tableHeader={header} tableBody={body} />
			</PageWrapper>
		</>
	);
}
