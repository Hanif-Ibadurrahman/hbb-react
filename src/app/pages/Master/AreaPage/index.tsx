import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedAreaResponse from "app/pages/Interface/folder";

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
		title: "Nama Area",
		prop: "name",
		sortable: true,
		cellProps: {
			style: { width: "80%" },
		},
	},
	// {
	// 	title: "Tanggal",
	// 	prop: "created_at",
	// 	sortable: true,
	// 	cellProps: {
	// 		style: { background: "#fafafa", width: "40%" },
	// 		className: "realname-class",
	// 	},
	// },
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

export function AreaPage() {
	const [data, setData] = useState([]);

	// API hit.
	async function getAreas() {
		const { data } = await api.get<PaginatedAreaResponse>(`/areas?limit`);
		console.log(data.data);

		const newData = data.data as any;

		setData(newData);
	}

	useEffect(() => {
		getAreas();
	}, []);

	return (
		<>
			<Helmet>
				<title>Dox - Master Area</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<PageHeader breadcrumb={["Master", "Area"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={data} />
			</PageWrapper>
		</>
	);
}
