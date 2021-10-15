import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedDocumentResponse from "app/pages/Interface/document";

const action = [
	{
		icon: "fa-search",
		title: "Detail",
		// action: NavLinkAction("/Box-Detail"),
	},
	{
		icon: "fa-copy ",
		title: "Duplicate",
		// action: NavLinkAction("/Box-Detail"),
	},
	{
		icon: "fa-edit",
		title: "Edit",
		// action: NavLinkAction("/Box-Detail"),
	},
	{
		icon: "fa-trash-alt",
		title: "Delete",
		titleClass: "tc-danger-5",
		// action: NavLinkAction("/Box-Detail"),
	},
];

const header = [
	{
		title: "Code Document",
		prop: "no",
		sortable: true,
		cellProps: {
			style: { width: "40%" },
		},
	},
	{
		title: "Tanggal",
		prop: "date",
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
		cell: row => {
			return <DropdownAction list={action} />;
		},
	},
];

export function DocumentPage() {
	const [data, setData] = useState([]);

	// API hit.
	async function getDocuments() {
		const { data } = await api.get<PaginatedDocumentResponse>(`/documents`);
		console.log(data.data);
		const newData = data.data as any;
		setData(newData);
	}

	useEffect(() => {
		getDocuments();
	}, []);

	return (
		<>
			<Helmet>
				<title>Dox - Request Box</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<PageHeader
					breadcrumb={["Master", "Document"]}
					addForm={<ModalForm />}
				/>
				<DataTable tableHeader={header} tableBody={data} />
			</PageWrapper>
		</>
	);
}
