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
	ApprovalAdmin,
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "app/components/Alerts";
import moment from "moment";
import ModalForm from "./ModalForm";
import { selectPickUpItems } from "store/Selector/PickUpSelector";
import { getApproveAdminList } from "actions/PickUpAction";

const ApprovalAdminPickupBox = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	// const requestBoxes = useSelector(selectRequestBoxes);
	const pickUpList = useSelector(selectPickUpItems);

	console.log("Kambing Data", pickUpList.PickUpItemList);

	// const boxes = useSelector(selectBoxes);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getApproveAdminList(page));
		// dispatch(getRequestBoxesList(page));
		// dispatch(getBoxesList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const NewDate = (date: any) => {
		return moment(date).format("d MMMM YYYY");
	};

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
		dispatch(await ApprovalAdmin(payload));
		setShowAlertSuccess(true);
		// setTimeout(function () {
		// 	setShowAlertSuccess(false);
		// }, 4000);
		// setTimeout(function () {
		// 	window.location.reload();
		// }, 1000);
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
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Tanggal Kirim",
			prop: "delivered_at",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return NewDate(row.delivered_at);
			},
		},
		{
			title: "Pemilik",
			prop: "location",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
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
				<PageHeader breadcrumb={["Dashboard", "Approval Pick Up"]} />
				<DataTable tableHeader={header} tableBody={pickUpList.PickUpItemList} />
				<Pagination
					pageCount={pickUpList.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ApprovalAdminPickupBox;
