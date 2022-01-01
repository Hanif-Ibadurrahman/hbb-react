import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Components/PageHeader";
import DropdownAction from "../../Components/DropdownAction";
// import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { selectBoxes } from "store/Selector/BoxSelector";
import { getTransporterList } from "actions/UserAction";
import { selectUsers } from "store/Selector/UserSelector";

const TransporterPage = () => {
	const transporter = useSelector(selectUsers);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getTransporterList(page));
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
				<title>Dox - Master Trasnporter</title>
				<meta name="description" content="Data Transporter" />
			</Helmet>
			<PageWrapper>
				<PageHeader
					breadcrumb={["Master", "Transporter"]}
					modal={"setModalShow"}
					valueModalSet={false}
					value={true}
				/>
				<DataTable tableHeader={header} tableBody={transporter.Users} />
				<Pagination
					pageCount={transporter.Meta.LastPage}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default TransporterPage;
