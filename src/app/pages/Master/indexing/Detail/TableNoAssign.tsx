import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
import { useDispatch } from "react-redux";
import ModalForm from "../AssignDocToFolder/ModalAssign";
import "./page.scoped.scss";
import _ from "lodash";
import { getDocumentsAssigned } from "actions/DocumentAction";
import ModalDetach from "../AssignDocToFolder/ModalDettach";
import ModalAddReference from "../../DocumentPage/ModalAddReference";

const TableNoAssign = props => {
	const [modalShow, setModalShow] = useState(false);
	const [folderId, setFolderId] = useState("");
	const [modalDettach, setModalShowDettach] = useState(false);
	const [modalShowReference, setModalShowReference] = useState(false);

	const DocumentAssigned = (page = 1) => {
		dispatch(getDocumentsAssigned(page));
	};

	useEffect(() => {
		DocumentAssigned();
	}, []);

	const dispatch = useDispatch();

	const _onHide = () => {
		setModalShow(false);
	};
	const onHideDettach = () => {
		setModalShowDettach(false);
	};

	const onHideReference = () => {
		setModalShowReference(false);
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
			type: 1,
		},
		// {
		// 	icon: "fa-edit",
		// 	title: "Lampirkan File",
		// 	type: 2,
		// 	onclick: () => {
		// 		setFolderId(id);
		// 		setModalShowReference(true);
		// 	},
		// 	dispatch: dispatch,
		// 	row: id,
		// },
	];

	const header = [
		{
			title: "Detail",
			prop: "detail",
			cellProps: {
				style: { width: "80%" },
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
				<title>Dox - Indexing</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				{/* <ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<ModalAddReference
					modal={modalShowReference}
					hide={onHideReference}
					modalSet={setModalShowReference}
					valueModalSet={false}
					folder_id={folderId}
				/>
				<ModalDetach
					modal={modalDettach}
					hide={onHideDettach}
					modalSet={setModalShowDettach}
					valueModalSet={false}
					folder_id={folderId}
				/> */}
				<div className="d-flex jc-between w-100% mb-4">
					<h6>Daftar Dokumen</h6>
				</div>
				<DataTable tableHeader={header} tableBody={props?.DataTable} />
			</PageWrapper>
		</>
	);
};

export default TableNoAssign;
