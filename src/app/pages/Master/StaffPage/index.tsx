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
import { selectStaffs } from "store/Selector/StaffSelector";
import {
	deleteStaff,
	getstaffsList,
	RESET_STAFF_FORM,
	SearchStaff,
	getStaffDetail,
} from "actions/StaffAction";
import { SearchInput } from "./FilterInput";
import Alert from "app/components/Alerts";

const StaffPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const staffs = useSelector(selectStaffs);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		if (staffs.Staff.username === "") {
			dispatch(getstaffsList(page));
		} else {
			dispatch(SearchStaff);
		}
	};
	useEffect(() => {
		FetchData();
	}, []);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		dispatch({ type: RESET_STAFF_FORM });
	};

	const showEditForm = async id => {
		dispatch(getStaffDetail(id));
		setModalShow(true);
	};

	const onDelete = (dispatch, id) => {
		Swal.fire({
			text: "Apakah anda ingin menghapus data ini?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Hapus",
		}).then(willDelete => {
			if (willDelete.isConfirmed) {
				dispatch(deleteStaff(id));
				setShowAlertSuccess(true);
				setTimeout(function () {
					setShowAlertSuccess(false);
				}, 4000);
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			}
		});
	};

	const action = id => [
		{
			icon: "fa-edit",
			title: "Edit",
			type: 2,
			onclick: () => {
				showEditForm(id);
			},
			dispatch: dispatch,
			row: id,
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
			title: "Username",
			prop: "username",
			cellProps: {
				style: { width: "30%" },
			},
		},
		{
			title: "Kode Pelaksana",
			prop: "implementer_code",
			cellProps: {
				style: { width: "30%" },
			},
			cell: row => {
				return row?.staff?.implementer_code || "-";
			},
		},
		{
			title: "Ruangan",
			prop: "room",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return row?.staff?.room?.name || "-";
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
				return <DropdownAction list={action(row.staff.id)} />;
			},
		},
	];

	return (
		<>
			<Helmet>
				<title>Dox - Master Room</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<Alert
				text="Data Berhasil Di Hapus"
				variant="success"
				show={showAlertSuccess}
				onHide={() => setShowAlertSuccess(false)}
			/>
			<PageWrapper>
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<PageHeader
					breadcrumb={["Master", "Staff"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
					filter={SearchInput}
				/>
				<DataTable tableHeader={header} tableBody={staffs.Staffs} />
				<Pagination
					pageCount={staffs.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default StaffPage;
