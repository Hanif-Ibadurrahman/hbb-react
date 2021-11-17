import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { getCabinetsList } from "actions/CabinetAction";
import { connect, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteCabinet } from "actions/CabinetAction";
import Alert from "app/components/Alerts";

const mapStateToProps = state => {
	return {
		cabinets: state.cabinets.cabinets,
		meta: state.cabinets.meta,
	};
};

const CabinetPage = props => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getCabinetsList(page));
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
				dispatch(deleteCabinet(key));
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

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Cabinet-Detail/" + id,
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
			onclick: onDelete,
			dispatch: dispatch,
			row: id,
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
				return <DropdownAction list={action(row.id)} />;
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
