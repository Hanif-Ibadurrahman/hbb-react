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
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";
import { ModalFormReject, ModalFormApprove } from "./ModalForm";

const ApprovalPreview = () => {
	const [modalShow, setModalShow] = useState(false);
	const [modalShowApprove, setModalShowApprove] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getAllConfirmedAdmin(page));
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

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "DetailRequestBox/" + id,
			type: 1,
		},
		{
			icon: "fa-print",
			title: "Print",
			url: "/Print-Approval/" + id,
			type: 1,
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
				return moment(row.delivered_at).format("DD MMMM YYYY");
			},
		},
		{
			title: "Tipe Permintaan",
			prop: "type",
			sortable: true,
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
				<PageHeader breadcrumb={["Master", "Approval Operation"]} />
				<DataTable tableHeader={header} tableBody={requestBoxes.RequestBoxes} />
				<Pagination
					pageCount={requestBoxes.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ApprovalPreview;
