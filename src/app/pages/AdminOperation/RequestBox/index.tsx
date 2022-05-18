import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Approval/Components/PageHeader";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import {
	getRequestBoxDetail,
	getAllConfirmedAdmin,
	SearchApprovalOperation,
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";
import { ModalFormReject, ModalFormApprove } from "./ModalForm";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { SearchInput } from "./FilterInput";

const ApprovalOperationRequestBox = () => {
	const [modalShow, setModalShow] = useState(false);
	const [modalShowApprove, setModalShowApprove] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		if (requestBoxes.RequestBoxes.length === 0) {
			dispatch(getAllConfirmedAdmin(page));
		} else {
			dispatch(SearchApprovalOperation);
		}
	};

	useEffect(() => {
		FetchData();
	}, []);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
		setModalShowApprove(false);
	};

	const RejectForm = async id => {
		dispatch(getRequestBoxDetail(id));
		setModalShow(true);
	};

	const ApproveForm = async id => {
		dispatch(getRequestBoxDetail(id));
		setModalShowApprove(true);
	};

	let history = useHistory();

	const PreviewApproval = () => {
		history.push("/Preview-Approvral");
		window.location.reload();
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
			type: 2,
			onclick: () => {
				ApproveForm(id);
			},
			dispatch: dispatch,
			row: id,
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
			prop: "created_at",
			sortable: true,
			cellProps: {
				style: { width: "30%" },
			},
			headerCell: sortedProp => {
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
				style: { width: "30%" },
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
				<ModalFormReject
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<ModalFormApprove
					modalApprove={modalShowApprove}
					hide={_onHide}
					modalSet={setModalShowApprove}
					valueModalSet={false}
				/>
				<SearchInput />
				<DataTable
					tableHeader={header}
					tableBody={requestBoxes?.RequestBoxes}
				/>
				<Pagination
					pageCount={requestBoxes.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
				<div className="d-flex jc-end mt-6">
					<Button onClick={PreviewApproval} variant="secondary">
						{" "}
						Print Barcode <i className="fas fa-arrow-right ml-2"></i>{" "}
					</Button>
				</div>
			</PageWrapper>
		</>
	);
};

export default ApprovalOperationRequestBox;
