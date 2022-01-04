import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Master/Components/PageHeader";
import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getRequestBoxesList } from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "app/components/Alerts";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";

const BoxPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getRequestBoxesList(page));
	};

	console.log("Data Request", requestBoxes.Meta);

	useEffect(() => {
		FetchData();
	}, []);

	const NewData = moment(requestBoxes.RequestBoxes["Delivered_at"]).format(
		"d MMMM YYYY",
	);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
	};

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
			title: "Note",
			prop: "note",
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Quantity",
			prop: "quantity",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
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
					text="Data Berhasil Di Hapus"
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
				<PageHeader
					breadcrumb={["Master", "Box"]}
					modal={setModalShow}
					valueModalSet={false}
					value={true}
				/>
				<DataTable tableHeader={header} tableBody={requestBoxes.RequestBoxes} />
				<Pagination
					pageCount={requestBoxes.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default BoxPage;
