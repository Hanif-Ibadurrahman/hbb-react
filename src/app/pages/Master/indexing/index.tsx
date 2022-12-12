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
import moment from "moment";
import { SearchIndex } from "./FilterInput";
import { selectindexings } from "store/Selector/IndexingSelector";
import {
	deleteIndexing,
	getIndexingDetail,
	getIndexingList,
	RESET_INDEX_FORM,
	SearchIndexing,
} from "actions/IndexingAction";
import ModalAddReference from "../DocumentPage/ModalAddReference";

const IndexingPage = () => {
	const user = localStorage.getItem("User");
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const indexings = useSelector(selectindexings);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		if (indexings.Indexing.index === "") {
			dispatch(getIndexingList(page));
		} else {
			dispatch(SearchIndexing);
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
				dispatch(deleteIndexing(id));
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
		dispatch({ type: RESET_INDEX_FORM });
	};

	const showEditForm = async id => {
		dispatch(getIndexingDetail(id));
		setModalShow(true);
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "IndexingDetail/" + id,
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

	const actionCustomer = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "IndexingDetail/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "Index",
			prop: "index",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Periode Retensi",
			prop: "retention_period",
			cellProps: {
				style: { width: "20%" },
			},
		},
		{
			title: "Tanggal Pembuatan",
			prop: "date",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return moment(row.created_at).format("DD MMMM YYYY");
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
		if (user === "superadmin") {
			return (
				<>
					<PageHeader
						breadcrumb={["Master", "Indexing"]}
						modal={setModalShow}
						valueModalSet={false}
						value={true}
						filter={SearchIndex}
					/>
				</>
			);
		} else {
			return (
				<div
					style={{
						marginBottom: 20,
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<SearchIndex />
				</div>
			);
		}
	};

	return (
		<>
			<Helmet>
				<title>Dox - Indexing Page</title>
				<meta name="description" content="DOX" />
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
				<HeaderAction />
				<DataTable tableHeader={header} tableBody={indexings.Indexings} />
				<Pagination
					pageCount={indexings.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default IndexingPage;
