import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getRequestBoxesList } from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";

const BoxPage = () => {
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
				<meta name="description" content="Request Box" />
			</Helmet>
			<PageWrapper>
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
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
