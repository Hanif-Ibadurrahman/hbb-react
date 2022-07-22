import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import ModalForm from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { selectClassifications } from "store/Selector/ClassificationSelector";
import { useDispatch, useSelector } from "react-redux";
import {
	getClassificationsList,
	getClassificationDetail,
	deleteClassification,
	SearchClassification,
} from "actions/ClassificationAction";
import Swal from "sweetalert2";
import Alert from "app/components/Alerts";
import { SearchInput } from "./FilterInput";

const ClassificationPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const classifications = useSelector(selectClassifications);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		if (classifications.Classification.code === "") {
			dispatch(getClassificationsList(page));
		} else {
			dispatch(SearchClassification);
		}
	};

	useEffect(() => {
		FetchData();
	}, []);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
	};

	const showEditForm = async id => {
		dispatch(getClassificationDetail(id));
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
				dispatch(deleteClassification(id));
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
			icon: "fa-search",
			title: "Detail",
			url: "Classification-Detail/" + id,
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
			title: "Nama Klasifikasi",
			prop: "name",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Code Klasifikasi",
			prop: "code_classification",
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

	return (
		<>
			<Helmet>
				<title>Dox - Master Klasifikasi</title>
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
					breadcrumb={["Master", "Klasifikasi"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
					filter={SearchInput}
				/>
				<DataTable
					tableHeader={header}
					tableBody={classifications.Classifications}
				/>
				<Pagination
					pageCount={classifications.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ClassificationPage;
