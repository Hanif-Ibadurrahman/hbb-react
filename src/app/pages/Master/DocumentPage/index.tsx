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
import { selectDocuemnts } from "store/Selector/DocumentSelector";
import {
	deleteDocument,
	getDocumentDetail,
	getDocumentsList,
	filterData,
	RESET_DOCUMENT_FORM,
} from "actions/DocumentAction";
import { ModalFilter } from "./ModalFilter";

const DocumentPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const documents = useSelector(selectDocuemnts);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		if (
			documents.Document.no === "" ||
			documents.Document.detail === "" ||
			documents.Document.active_year_for === 0 ||
			documents.Document.level_progress === "" ||
			documents.Document.media_storage === "" ||
			documents.Document.condition === "" ||
			documents.Document.description === "" ||
			documents.Document.status === ""
		) {
			dispatch(getDocumentsList(page));
		} else {
			dispatch(filterData);
		}
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
			if (willDelete.isConfirmed) {
				dispatch(deleteDocument(id));
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

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		dispatch({ type: RESET_DOCUMENT_FORM });
	};

	const showEditForm = async id => {
		dispatch(getDocumentDetail(id));
		setModalShow(true);
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
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
			title: "No Document",
			prop: "no",
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`No Document`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
			},
		},
		{
			title: "No Digital",
			prop: "no_digital",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`No Digital`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
			},
		},
		{
			title: "Kondisi",
			prop: "condition",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`Kondisi`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
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
				<title>Document</title>
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
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<PageHeader
					breadcrumb={["Master", "Document"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
					filter={ModalFilter}
				/>
				<DataTable tableHeader={header} tableBody={documents.Documents} />
				<Pagination
					pageCount={documents.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default DocumentPage;
