import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import {
	getRequestBoxesList,
	getRequestBoxDetail,
	UpdateRequestBox,
	ApprovalAdmin,
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteBox } from "actions/BoxActions";
import Alert from "app/components/Alerts";
import {
	selectRequestBoxes,
	selectRequestBox,
} from "store/Selector/RequestBoxSelector";
import moment from "moment";
import ModalForm from "./ModalForm";
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import { approval_admin } from "api/requestBox";

const ApprovalAdminRequestBox = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertDanger, setShowAlertDanger] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const requestBoxes = useSelector(selectRequestBoxes);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getRequestBoxesList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
	};

	const RejectForm = async id => {
		console.log("Reject Id", id);
		dispatch(getRequestBoxDetail(id));
		setModalShow(true);
	};

	const Approval = async id => {
		let payload = {
			Id: id,
			Approved: true,
			Description: "",
		};
		try {
			let action = ApprovalAdmin(payload);
			const res = await action;
			await dispatch(res);
			action.then(() => {
				setShowAlertSuccess(true);
				setTimeout(function () {
					setShowAlertSuccess(false);
				}, 4000);
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			});
		} catch (e) {
			setShowAlertDanger(true);
			setTimeout(function () {
				setShowAlertDanger(false);
			}, 4000);
		}
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "DetailRequestBox/" + id,
			type: 1,
		},
		{
			icon: "fa-check-square",
			title: "Terima",
			titleClass: "tc-success-5",
			onclick: () => {
				Approval(id);
			},
			dispatch: dispatch,
			row: id,
			type: 2,
		},
		{
			icon: "fa-vote-nay",
			title: "Tolak",
			titleClass: "tc-danger-5",
			type: 2,
			onclick: () => {
				RejectForm(id);
			},
			dispatch: dispatch,
			row: id,
		},
	];

	const header = [
		{
			title: "Id Request",
			prop: "id",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			prop: 'created_at',
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			headerCell: (sortedProp) => {
				const isActive = sortedProp.prop === 'created_at';
				const order = sortedProp.isAscending ? 'Terlama' : 'Terbaru';

				return (
					<div className="cur-p">
						{`Tanggal Permintaan`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
			},
			cell: row => {
				return moment(row.created_at).format("DD MMMM YYYY");
			},
		},
		{
			title: "Tipe Permintaan",
			prop: "type",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return (
					<>
						{row.type == "request-box"
							? "Request Box"
							: row.type == "pickup-box"
								? "Pick Up Box"
								: row.type == "borrow-item"
									? "Peminjaman"
									: row.type == "return-item"
										? "Pengembalian"
										: null}
					</>
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
				<title>Dox - Request Box</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<Alert
					text="Data Berhasil Di Approve"
					variant="success"
					show={showAlertSuccess}
					onHide={() => setShowAlertSuccess(false)}
				/>
				<Alert
					text="Data Gagal Di Update"
					variant="danger"
					show={showAlertDanger}
					onHide={() => setShowAlertDanger(false)}
				/>
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<PageHeader breadcrumb={["Dashboard", "Approval"]} />
				<DataTable
					tableHeader={header}
					tableBody={requestBoxes.RequestBoxes}
					initialSort={{ prop: "created_at", isAscending: true }}
				/>
				<Pagination
					pageCount={requestBoxes.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ApprovalAdminRequestBox;
