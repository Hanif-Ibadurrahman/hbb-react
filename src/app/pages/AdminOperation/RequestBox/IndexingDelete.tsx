import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
// import PageHeader from "app/Components/PageHeader";
import DropdownAction from "app/components/DropdownAction";
// import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Alert from "app/components/Alerts";
import moment from "moment";
// import { SearchInput } from "./FilterInput";
import { selectindexings } from "store/Selector/IndexingSelector";
import {
	deleteIndexing,
	getIndexingDetail,
	getIndexingList,
	RESET_INDEX_FORM,
	SearchIndexing,
	getIndexingRetention,
} from "actions/IndexingAction";

const IndexingPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const indexings = useSelector(selectindexings);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		if (indexings.Indexing.index === "") {
			dispatch(getIndexingRetention(page));
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

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "IndexingDetail/" + id,
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
			title: "Index",
			prop: "index",
			cellProps: {
				style: { width: "30%" },
			},
		},
		{
			title: "Klasifikasi",
			prop: "classification",
			cellProps: {
				style: { width: "20%" },
			},
		},
		{
			title: "Record Center",
			prop: "recordCenter",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return row?.room?.name;
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
