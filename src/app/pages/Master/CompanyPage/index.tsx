import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getCompanyList, getCompanyDetail } from "actions/CompanyAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteCompany } from "actions/CompanyAction";
import Alert from "app/components/Alerts";
import { selectCompanys } from "store/Selector/CompanySelector";

const CompanyPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const Companys = useSelector(selectCompanys);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getCompanyList(page));
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
				dispatch(deleteCompany(id));
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
		dispatch(getCompanyDetail(id));
		setModalShow(true);
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Company-Detail/" + id,
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
			title: "Code Perusahaan",
			prop: "code",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Nama Perusahaan",
			prop: "name",
			cellProps: {
				style: { width: "40%" },
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

	const Filter = () => {
		return <div></div>;
	};

	return (
		<>
			<Helmet>
				<title>Dox - Request Company</title>
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
					breadcrumb={["Master", "Company"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
					filter={Filter}
				/>
				<DataTable
					tableHeader={header}
					tableBody={Companys?.Companys ? Companys?.Companys : []}
				/>
				<Pagination
					pageCount={Companys?.Meta?.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default CompanyPage;
