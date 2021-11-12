import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { connect, useDispatch } from "react-redux";
import { getDocumentsList } from "actions/DocumentAction";

const mapStateToProps = state => {
	return {
		documents: state.documents.documents,
		meta: state.documents.meta,
	};
};

const DocumentPage = props => {
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getDocumentsList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = key => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + key,
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
			onclick: "",
			id: key,
		},
	];

	const header = [
		{
			title: "Code Document",
			prop: "no",
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
				return <DropdownAction list={action(row.key)} />;
			},
		},
	];

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
				<DataTable tableHeader={header} tableBody={props.documents} />
				<Pagination
					pageCount={props.meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(DocumentPage);
