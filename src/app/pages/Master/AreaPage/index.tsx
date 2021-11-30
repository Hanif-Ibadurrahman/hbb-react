import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { selectAreas } from "store/Selector/AreaSelector";
import { useDispatch, useSelector } from "react-redux";
import { getAreasList, getAreaDetail } from "actions/AreaActions";

const AreaPage = props => {
	const areas = useSelector(selectAreas);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getAreasList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Area-Detail/" + id,
			type: 1,
		},
		{
			icon: "fa-copy ",
			title: "Duplicate",
			type: 2,
		},
		{
			icon: "fa-edit",
			title: "Edit",
			type: 1,
		},
		{
			icon: "fa-trash-alt",
			title: "Delete",
			titleClass: "tc-danger-5",
			type: 2,
			onclick: "onDelete",
			id: id,
			url: "",
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
		{
			title: "Action",
			prop: "Action",
			cellProps: {
				style: { flex: 1 },
				className: "realname-class",
			},
			cell: row => {
				return <DropdownAction list={action(row.id)} />;
			},
		},
	];

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
				<DataTable tableHeader={header} tableBody={areas.Areas} />
				{/* <Pagination
					pageCount={props.meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/> */}
			</PageWrapper>
		</>
	);
};

export default AreaPage;
