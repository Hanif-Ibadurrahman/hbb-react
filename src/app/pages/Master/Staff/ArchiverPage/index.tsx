import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Components/PageHeader";
import DropdownAction from "../../Components/DropdownAction";
// import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getArchiverList } from "actions/ArchiverAction";
import { selectArchivers } from "store/Selector/ArchiverSelector";

const ArchiverPage = () => {
	const archiver = useSelector(selectArchivers);
	const dispatch = useDispatch();

	console.log("Archiver", archiver);

	const FetchData = (page = 1) => {
		dispatch(getArchiverList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			// url: "Box-Detail/" + id,
			type: 1,
		},
		{
			icon: "fa-edit",
			title: "Edit",
			onclick: () => {
				// showEditForm(id);
			},
			dispatch: dispatch,
			row: id,
			type: 2,
		},
		{
			icon: "fa-trash-alt",
			title: "Delete",
			titleClass: "tc-danger-5",
			type: 2,
			// onclick: onDelete,
			dispatch: dispatch,
			row: id,
		},
	];

	const header = [
		{
			title: "Code Box",
			prop: "id",
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
				<title>Dox - Master Archiver</title>
				<meta name="description" content="Data Archiver" />
			</Helmet>
			<PageWrapper>
				<PageHeader
					breadcrumb={["Master", "Archiver"]}
					modal={"setModalShow"}
					valueModalSet={false}
					value={true}
				/>
				<DataTable tableHeader={header} tableBody={archiver.Archivers} />
				<Pagination
					pageCount={archiver.Meta.LastPage}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ArchiverPage;
