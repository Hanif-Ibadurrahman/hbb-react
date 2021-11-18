import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { getRoomsList } from "actions/RoomAction";
import { connect, useDispatch } from "react-redux";

const mapStateToProps = state => {
	return {
		rooms: state.rooms.rooms,
		meta: state.rooms.meta,
	};
};

const RoomPage = props => {
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getRoomsList(page));
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
			prop: "code_room",
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
				<PageHeader breadcrumb={["Master", "Room"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={props.rooms} />
				<Pagination
					pageCount={props.meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(RoomPage);
