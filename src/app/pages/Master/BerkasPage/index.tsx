import React, {  useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";

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
		title: "Indeks",
		prop: "indeks",
		sortable: true,
		cellProps: {
			style: { width: "40%" },
		},
	},
	{
		title: "Tipe",
		prop: "type",
		sortable: true,
		cellProps: {
			style: { background: "#fafafa", width: "15%" },
			className: "realname-class",
		},
	},
	{
		title: "Klasifikasi",
		prop: "klasifikasi",
		sortable: true,
		cellProps: {
			style: { width: "15%" },
			className: "realname-class",
		},
	},
	{
		title: "Record Center",
		prop: "recordcenter",
		sortable: true,
		cellProps: {
			style: { background: "#fafafa", width: "20%" },
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

const body = Array.from(new Array(30), () => {
	const rd = (Math.random() * 10).toFixed(1);

	if (rd > "0.5") {
		return {
			indeks: "Tes Permberkasan 24 Februari 2020",
			type: `Fasilitatif`,
			klasifikasi: `KP ${rd}`,
			recordcenter: "RC Bandung",
		};
	}

	return {
		indeks: "Tes Permberkasan 24 Februari 2021",
		type: `Fasilitatif`,
		klasifikasi: `KP ${rd}`,
		recordcenter: "RC Bogor",
	};
});

export function BerkasPage() {
	const [data, setData] = useState([]);

	// API hit.
	// async function getAreas() {
	// 	const { data } = await api.get<PaginatedAreaResponse>(`/areas?limit`);
	// 	console.log(data.data);

	// 	const newData = data.data as any;

	// 	setData(newData);
	// }

	// useEffect(() => {
	// 	getAreas();
	// }, []);

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
				<PageHeader breadcrumb={["Master", "Berkas"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={body} />
			</PageWrapper>
		</>
	);
}
