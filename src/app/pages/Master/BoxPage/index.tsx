import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { deleteBox } from "actions/BoxActions";
import Alert from "app/components/Alerts";

const mapStateToProps = state => {
	return {
		boxes: state.boxes.boxes,
		meta: state.boxes.meta,
	};
};
const BoxPage = props => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getBoxesList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const onDelete = (dispatch, key) => {
		Swal.fire({
			text: "Apakah anda ingin menghapus data ini?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Hapus",
		}).then(willDelete => {
			if (willDelete) {
				dispatch(deleteBox(key));
				setShowAlertSuccess(true);
				setTimeout(function () {
					setShowAlertSuccess(false);
				}, 4000);
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			} else {
				setShowAlertFailed(true);
				setTimeout(function () {
					setShowAlertFailed(false);
				}, 4000);
			}
		});
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
			onclick: onDelete,
			dispatch: dispatch,
			row: key,
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
				<Alert
					text="Data Berhasil Di Hapus"
					variant="success"
					show={showAlertSuccess}
					onHide={() => setShowAlertSuccess(false)}
				/>
				<Alert
					text="Data Gagal Di Hapus"
					variant="danger"
					show={showAlertFailed}
					onHide={() => setShowAlertFailed(false)}
				/>
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
