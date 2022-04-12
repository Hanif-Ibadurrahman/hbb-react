import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import {
	getBoxesList,
	getBoxDetail,
	RESET_BOX_FORM,
	SearchBoxes,
} from "actions/BoxActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteBox } from "actions/BoxActions";
import Alert from "app/components/Alerts";
import { selectBoxes } from "store/Selector/BoxSelector";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { SearchInput } from "./FilterInput";

const BoxPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const boxes = useSelector(selectBoxes);
	const dispatch = useDispatch();

	let history = useHistory();
	const handlePrint = () => {
		history.push("/Print-PerPage");
		setTimeout(function () {
			window.location.reload();
		}, 1000);
	};

	const FetchData = (page = 1) => {
		if (boxes.Box.code_box === "") {
			dispatch(getBoxesList(page));
		} else {
			dispatch(SearchBoxes);
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
				dispatch(deleteBox(id));
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
		dispatch({ type: RESET_BOX_FORM });
	};

	const showEditForm = async id => {
		dispatch(getBoxDetail(id));
		setModalShow(true);
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Box-Detail/" + id,
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
			icon: "fa-print",
			title: "Print",
			url: "Print-Barcode/" + id,
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
			title: "Code Box",
			prop: "code_box",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			prop: "created_at",
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`Tanggal Pembuatan`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
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
				return <DropdownAction list={action(row.id)} />;
			},
		},
	];

	return (
		<>
			<Helmet>
				<title>Dox - Box Page</title>
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
					breadcrumb={["Master", "Box"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
					filter={SearchInput}
				/>
				<div className="d-flex mb-6">
					<Button
						className="d-flex ai-center mr-2 bg-warning-5"
						variant="warning"
						onClick={handlePrint}
					>
						Print All Box<i className="fas fa-print ml-2"></i>
					</Button>{" "}
				</div>
				<DataTable tableHeader={header} tableBody={boxes.Boxes} />
				<Pagination
					pageCount={boxes.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default BoxPage;
