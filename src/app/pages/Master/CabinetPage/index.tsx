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
import { getCabinetsList } from "actions/CabinetAction";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const mapStateToProps = state => {
	return {
		cabinets: state.cabinets.cabinets,
		meta: state.cabinets.meta,
	};
};

const CabinetPage = props => {
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getCabinetsList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = key => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Cabinet-Detail/" + key,
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
			url: "",
		},
	];

	const header = [
		{
			title: "Code Cabinet",
			prop: "code_cabinet",
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
					breadcrumb={["Master", "Cabinet"]}
					addForm={<ModalForm />}
				/>
				<DataTable tableHeader={header} tableBody={props.cabinets} />
				<Pagination
					pageCount={props.meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(CabinetPage);
