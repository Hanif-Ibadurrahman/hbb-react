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
import ModalAddReference from "./ModalAddReference";
import { UploadFileDoc } from "./UploadFiile";
import { Button } from "react-bootstrap";
import Breadcrumb from "app/components/BreadCrumb";
import { height } from "@mui/system";

const DocumentPage = () => {
	const user = localStorage.getItem("User");
	console.log("user >>>", user);
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [modalShowReference, setModalShowReference] = useState(false);
	const [folderId, setFolderId] = useState("");
	const documents = useSelector(selectDocuemnts);
	const dispatch = useDispatch();

	const validation =
		documents?.Document?.no === "" ||
		documents?.Document?.no === undefined ||
		documents?.Document?.detail === "" ||
		documents?.Document?.detail === undefined ||
		documents?.Document?.active_year_for === "" ||
		documents?.Document?.active_year_for === undefined ||
		documents?.Document?.level_progress === "" ||
		documents?.Document?.level_progress === undefined ||
		documents?.Document?.media_storage === "" ||
		documents?.Document?.media_storage === undefined ||
		documents?.Document?.condition === "" ||
		documents?.Document?.condition === undefined ||
		documents?.Document?.description === "" ||
		documents?.Document?.description === undefined ||
		documents?.Document?.status === "" ||
		documents?.Document?.status === undefined;

	const FetchData = (page = 1) => {
		if (validation) {
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
		dispatch({ type: RESET_DOCUMENT_FORM });
	};

	const onHideReference = () => {
		setModalShowReference(false);
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
			icon: "fa-edit",
			title: "Lampirkan File",
			type: 2,
			onclick: () => {
				setFolderId(id);
				setModalShowReference(true);
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

	const actionCustomer = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "Detail Document",
			prop: "detail",
			cellProps: {
				style: { width: "80%" },
			},
			cell: row => {
				return row?.detail ? row?.detail : "-";
			},
		},
		{
			title: "Lampiran",
			prop: "lampiran",
			cellProps: {
				style: { width: "10%", textAlign: "center" },
			},
			cell: row => {
				return (
					<div className="d-flex ai-center jc-center">
						{row?.document_file?.map((data, index) => (
							<div
								className="d-flex ai-center jc-center pv-2 ph-2 bg-primary-5 mr-2"
								style={{
									width: "35px",
									height: "38px",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								<div
									className="mb-3"
									onClick={() =>
										window.open(`${data}`, "popup", "width=1200,height=1200")
									}
								>
									<div className="d-flex jc-center ai-center mt-3">
										<i
											className="fas fa-file-alt"
											style={{ fontSize: "18px" }}
										></i>
									</div>
								</div>
							</div>
						))}
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
				return (
					<DropdownAction
						list={
							user === "superadmin" || user === "archiver"
								? action(row?.id)
								: actionCustomer(row?.id)
						}
					/>
				);
			},
		},
	];

	const HeaderAction = () => {
		if (user === "superadmin" || user === "archiver") {
			return (
				<div className="d-flex jc-between">
					<div style={{ width: "20%" }}>
						<Breadcrumb crumbs={["Master", "Document"]} selected />
					</div>
					<div className="d-flex">
						<UploadFileDoc />
						<div style={{ marginLeft: "12px", marginRight: "4px" }}>
							<ModalFilter />
						</div>
						<Button
							className="d-flex ai-center bg-success-6"
							variant="success"
							onClick={() => setModalShow(true)}
							style={{ height: "38px" }}
						>
							Add Data<i className="far fa-plus ml-2"></i>
						</Button>{" "}
					</div>
				</div>
			);
		} else {
			return (
				<div className="d-flex jc-between mb-4">
					<div style={{ width: "20%" }}>
						<Breadcrumb crumbs={["Master", "Document"]} selected />
					</div>
					<div className="d-flex">
						<div style={{ marginLeft: "12px", marginRight: "4px" }}>
							<ModalFilter />
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<>
			<Helmet>
				<title>Document</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				<Alert
					text="Data Berhasil Di Hapus"
					variant="success"
					show={showAlertSuccess}
					onHide={() => setShowAlertSuccess(false)}
				/>
				<ModalForm modal={modalShow} hide={_onHide} modalSet={setModalShow} />
				<ModalAddReference
					modal={modalShowReference}
					hide={onHideReference}
					modalSet={setModalShowReference}
					valueModalSet={false}
					folder_id={folderId}
				/>
				<HeaderAction />
				<DataTable
					tableHeader={header}
					tableBody={documents?.Documents ? documents?.Documents : []}
				/>
				<Pagination
					pageCount={documents?.Meta.last_page || 1}
					onPageChange={data => FetchData(data?.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default DocumentPage;
