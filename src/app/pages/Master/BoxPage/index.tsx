import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { ModalForm } from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getBoxesList } from "actions/BoxActions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
const mapStateToProps = state => {
	return {
		boxes: state.boxes.boxes,
		meta: state.boxes.meta,
	};
};
const BoxPage = props => {
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getBoxesList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = key => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Box-Detail/" + key,
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
			onclick: "",
			value: key,
			type: 2,
		},
		{
			icon: "fa-trash-alt",
			title: "Delete",
			titleClass: "tc-danger-5",
			type: 2,
			onclick: "",
			value: key,
		},
	];

	const header = [
		{
			title: "Code Box",
			prop: "code_box",
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
				<PageHeader breadcrumb={["Master", "Box"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={props.boxes} />
				<Pagination
					pageCount={props.meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(BoxPage);
