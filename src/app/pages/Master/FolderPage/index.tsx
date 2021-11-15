import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedFolderResponse from "app/pages/Interface/folder";
import { Pagination } from "app/components/Pagination";
import { getFoldersList } from "actions/FolderAction";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { propTypes } from "react-bootstrap/esm/Image";

const mapStateToProps = state => {
	return {
		folders: state.folders.folders,
		meta: state.folders.meta,
	};
};

const FolderPage = props => {
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getFoldersList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = key => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Folder-Detail/" + key,
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
			title: "Code Folder",
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
				<PageHeader breadcrumb={["Master", "Folder"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={props.folders} />
				<Pagination
					pageCount={props.meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(FolderPage);
