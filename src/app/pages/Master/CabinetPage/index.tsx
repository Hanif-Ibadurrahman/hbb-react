import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedCabinetResponse from "app/pages/Interface/cabinet";
import { Pagination } from "app/components/Pagination";

const header = [
	{
		title: "Code Cabinet",
		prop: "code_cabinet",
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

export function CabinetPage() {
	const [data, setData] = useState([]);

	const [pageCount, setpageCount] = useState(0);

	let limit = 20;

	const pagination = async currentPage => {
		const { data } = await api.get<PaginatedCabinetResponse>(
			`/cabinets?page=${currentPage}&_limit=${limit}`,
		);
		const newData = data.data as any;
		return newData;
	};

	const handlePageClick = async data => {
		console.log(data.selected);
		let currentPage = data.selected + 1;
		const commentsFormServer = await pagination(currentPage);
		setData(commentsFormServer);
	};

	// API hit.
	async function getCabinet() {
		const { data } = await api.get<PaginatedCabinetResponse>(
			`/cabinets?page=1&limit=${limit}`,
		);
		console.log(data.data);
		const newData = data.data as any;
		setData(newData);
		setpageCount(Math.ceil(data.meta.last_page));
	}

	useEffect(() => {
		getCabinet();
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
					breadcrumb={["Master", "Cabinet"]}
					addForm={<ModalForm />}
				/>
				<DataTable tableHeader={header} tableBody={data} />
				<Pagination pageCount={pageCount} onPageChange={handlePageClick} />
			</PageWrapper>
		</>
	);
}
