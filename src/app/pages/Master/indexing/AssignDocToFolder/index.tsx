import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
import { AddCartAssign } from "actions/IndexingAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalAssign";
import _ from "lodash";
import {
	selectDocuemnts,
	selectDocuemntsAssigned,
} from "store/Selector/DocumentSelector";
import {
	filterData,
	getDocumentsAssigned,
	getDocumentsList,
} from "actions/DocumentAction";
import ModalDetach from "./ModalDettach";
import ModalAddReference from "../../DocumentPage/ModalAddReference";
import { getDocumentFile } from "api/downloadDatabase";
import { ModalFilter } from "../../DocumentPage/ModalFilter";
import { Pagination } from "app/components/Pagination";
import "./page.scoped.scss";

const AssignDocToFolder = () => {
	const [modalShow, setModalShow] = useState(false);
	const [cart, setCart] = useState<Partial<any>>({});
	const cartStash = useSelector((state: RootStateOrAny) => state?.indexings);
	const documentAssigned = useSelector(selectDocuemntsAssigned);
	const documentNotAssignedFolder = documentAssigned.DocumentAssigned;
	const [folderId, setFolderId] = useState("");
	const [modalDettach, setModalShowDettach] = useState(false);
	const [modalShowReference, setModalShowReference] = useState(false);
	const documents = useSelector(selectDocuemnts);

	const addCart = async id => {
		checkCart(id);
		dispatch(await AddCartAssign(id));
	};

	const checkCart = id => {
		if (cart) {
			return cart?.Cart.indexOf(String(id));
		}
	};

	useEffect(() => {
		setCart(cartStash);
	}, []);

	useEffect(() => {
		setCart(cartStash);
	}, [cartStash]);

	const FetchData = (page = 1) => {
		if (
			documents.Document.no === "" ||
			documents.Document.detail === "" ||
			documents.Document.active_year_for === 0 ||
			documents.Document.level_progress === "" ||
			documents.Document.media_storage === "" ||
			documents.Document.condition === "" ||
			documents.Document.description === "" ||
			documents.Document.status === ""
		) {
			dispatch(getDocumentsList(page));
		} else {
			dispatch(filterData);
		}
	};

	useEffect(() => {
		FetchData();
	}, []);

	const DocumentAssigned = (page = 1) => {
		dispatch(getDocumentsAssigned(page));
	};

	useEffect(() => {
		DocumentAssigned();
	}, []);

	function idExists(id) {
		return documentNotAssignedFolder.some(function (el) {
			return el.id === id;
		});
	}
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
		{
			icon: "fa-hand-holding-box",
			title: "Pilih",
			onclick: () => {
				addCart(id);
			},
			dispatch: dispatch,
			row: id,
			type: 2,
		},
		{
			icon: "fa-edit",
			title: "Lampirkan File",
			type: 2,
			onclick: () => {
				setFolderId(id);
				setModalShowReference(true);
			},
			dispatch: dispatch,
			row: id,
		},
	];

	const actionDetach = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
			type: 1,
		},
		{
			icon: "fa-hand-holding-box",
			title: "Remove Folder",
			onclick: () => {
				setFolderId(id);
				setModalShowDettach(true);
			},
			dispatch: dispatch,
			row: id,
			type: 2,
		},
		{
			icon: "fa-edit",
			title: "Lampirkan File",
			type: 2,
			onclick: () => {
				setFolderId(id);
				setModalShowReference(true);
			},
			dispatch: dispatch,
			row: id,
		},
	];

	const header = [
		{
			title: "Detail Dokumen",
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
				return (
					<DropdownAction
						list={
							idExists(row.id) === true ? action(row.id) : actionDetach(row.id)
						}
					/>
				);
			},
		},
	];

	function Cart(): JSX.Element {
		return (
			<>
				<div className="ph-4 pv-4 bg-dark-contrast bd-tl-rs-4 bd-tr-rs-4 d-flex cart-popup">
					<div className="d-flex ai-center">
						<h5 className="text ff-1-bd mr-3">{cartStash?.NumberCartAssign}</h5>
						<p className="p-lg">Document dipilih</p>
					</div>
					<button
						className="ph-2 h-12 bd-rs-6 d-flex ai-center jc-center bg-success-1 ml-a cur-p"
						onClick={() => setModalShow(true)}
						disabled={cartStash?.NumberCartAssign === 0}
					>
						<span className="text p-lg mh-2 tc-success-5">Proses</span>
						<span
							className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-success-5"
							style={{ marginTop: -3 }}
						>
							<i className="fas fa-chevron-double-right tc-dark-contrast"></i>
						</span>
					</button>
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Dox - Assign Document To Folder</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				<ModalForm
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
				/>
				<div
					style={{
						marginBottom: 20,
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<ModalFilter />
				</div>
				<DataTable
					tableHeader={header}
					tableBody={documents.Documents ? documents.Documents : []}
				/>
				<Pagination
					pageCount={documents.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
				<Cart />
			</PageWrapper>
		</>
	);
};

export default AssignDocToFolder;
