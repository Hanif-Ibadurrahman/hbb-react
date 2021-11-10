import React, { useState, useRef, useEffect, Component } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedBoxResponse from "app/pages/Interface/box";
import { Pagination } from "app/components/Pagination";
import { useHistory } from "react-router";
import { getBoxesList } from "actions/userActions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
const mapStateToProps = state => {
	return {
		boxes: state.boxes.boxes,
	};
};
const BoxPage = props => {
	const [data, setData] = useState([]);

	const [modalShow, setModalShow] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	let history = useHistory();

	const _onHide = () => {
		setModalShow(false);
		setModalEdit(false);
		setShowAlert(false);
	};

	const [pageCount, setpageCount] = useState(0);

	let limit = 20;

	const pagination = async currentPage => {
		const { data } = await api.get<PaginatedBoxResponse>(
			`/boxes?page=${currentPage}&_limit=${limit}`,
		);
		const newData = data.data as any;
		return newData;
	};

	const handlePageClick = async data => {
		let currentPage = data.selected + 1;
		const commentsFormServer = await pagination(currentPage);
		setData(commentsFormServer);
	};

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

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoxesList());
	}, [dispatch]);
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
					breadcrumb={["Master", "Box"]}
					modal={setModalShow}
					value={true}
				/>
				{console.log(props.boxes)}
				<DataTable tableHeader={header} tableBody={props.boxes} />
				<Pagination pageCount={pageCount} onPageChange={handlePageClick} />
			</PageWrapper>
		</>
	);
};

export default connect(mapStateToProps, null)(BoxPage);
