import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { ModalForm } from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getCabinetsList, getCabinetDetail } from "actions/CabinetAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteCabinet } from "actions/CabinetAction";
import Alert from "app/components/Alerts";
import { selectCabinets } from "store/Selector/CabinetSelector";

const CabinetPage = props => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const cabinets = useSelector(selectCabinets);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getCabinetsList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const RoomArea = (page = 1) => {
		dispatch(getCabinetsList(page));
	};

	useEffect(() => {
		RoomArea();
	}, []);

	const onDelete = (dispatch, id) => {
		Swal.fire({
			text: "Apakah anda ingin menghapus data ini?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Hapus",
		}).then(willDelete => {
			if (willDelete) {
				dispatch(deleteCabinet(id));
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

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
	};

	const showEditForm = async id => {
		dispatch(getCabinetDetail(id));
		setModalShow(true);
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
			onclick: () => {
				showEditForm(id);
			},
			dispatch: dispatch,
			row: id,
			type: 2,
		},
		{
			icon: "fa-print",
			title: "Print",
			url: "Print-Cabinet/" + id,
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
				<title>Dox - Request Cabinet</title>
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
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
					data={props.areas}
				/>
				<PageHeader
					breadcrumb={["Master", "Cabinet"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
				/>
				<DataTable tableHeader={header} tableBody={cabinets.Cabinets} />
				<Pagination
					pageCount={cabinets.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default CabinetPage;
