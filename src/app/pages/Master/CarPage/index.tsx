import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Alert from "app/components/Alerts";
import { selectCars } from "store/Selector/CarSelector";
import {
	getCarsList,
	getCarDetail,
	deleteCar,
	SearchCar,
} from "actions/CarAction";
import { SearchInput } from "./FilterInput";
import { CarInterfaceState } from "store/Types/CarTypes";

const CarPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const cars = useSelector(selectCars);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getCarsList(page));
	};

	useEffect(() => {
		FetchData();
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
				dispatch(deleteCar(id));
				setShowAlertSuccess(true);
				setTimeout(function () {
					setShowAlertSuccess(false);
				}, 4000);
				// setTimeout(function () {
				// 	window.location.reload();
				// }, 1000);
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
		dispatch(getCarDetail(id));
		setModalShow(true);
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Car-Detail/" + id,
			type: 1,
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
			title: "Merk Mobil",
			prop: "brand",
			cellProps: {
				style: { width: "30%" },
			},
		},
		{
			title: "Nomor Plat",
			prop: "license_plate",
		},
		{
			title: "Kapasitas",
			prop: "capacity",
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
				<title>Dox - Transportasi</title>
				<meta name="description" content="DOX" />
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
				/>
				<PageHeader
					breadcrumb={["Master", "Box"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
					filter={SearchInput}
				/>
				<DataTable
					tableHeader={header}
					tableBody={cars?.Cars ? cars?.Cars : []}
				/>
				<Pagination
					pageCount={cars?.Cars.length / 20}
					onPageChange={data => FetchData(data?.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default CarPage;
