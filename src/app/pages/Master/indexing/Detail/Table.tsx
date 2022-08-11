import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { AddCart } from "actions/IndexingAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalForm";
import ModalDetach from "../AssignDocToFolder/ModalDettach";
import "./page.scoped.scss";
import _ from "lodash";
import { selectDocuemnts } from "store/Selector/DocumentSelector";
import {
	getDocumentsAssigned,
	getDocumentsListIndexing,
} from "actions/DocumentAction";
import { ModalFilter } from "../../DocumentPage/ModalFilter";
import ModalAddReference from "../../DocumentPage/ModalAddReference";

const TableIndexingPage = () => {
	const [modalShow, setModalShow] = useState(false);
	const [modalDettach, setModalShowDettach] = useState(false);
	const [cart, setCart] = useState<Partial<any>>({});
	const [folderId, setFolderId] = useState("");
	const documentList = useSelector(selectDocuemnts);
	const cartStash = useSelector((state: RootStateOrAny) => state?.indexings);
	const [modalShowReference, setModalShowReference] = useState(false);

	useEffect(() => {
		setCart(cartStash);
	}, []);

	useEffect(() => {
		setCart(cartStash);
	}, [cartStash]);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getDocumentsListIndexing(page));
	};

	const DocumentAssigned = (page = 1) => {
		dispatch(getDocumentsAssigned(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	useEffect(() => {
		DocumentAssigned();
	}, []);

	const onHide = () => {
		setModalShow(false);
	};

	const onHideDettach = () => {
		setModalShowDettach(false);
	};

	const addCart = async id => {
		checkCart(id);
		dispatch(await AddCart(id));
	};

	const checkCart = id => {
		if (cart) {
			const checkCart = cart?.Cart.indexOf(String(id));
		}
	};

	const onHideReference = () => {
		setModalShowReference(false);
	};

	const action = id => [
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
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
			type: 1,
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
			title: "Detail Document",
			prop: "detail",
			cellProps: {
				style: { width: "80%" },
			},
			cell: row => {
				return row?.detail ? row?.detail : "-";
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

	function Cart(): JSX.Element {
		return (
			<>
				<div className="ph-4 pv-4 bg-dark-contrast bd-tl-rs-4 bd-tr-rs-4 d-flex cart-indexing">
					<div className="d-flex ai-center">
						<h5 className="text ff-1-bd mr-3">{cart.numberCart}</h5>
						<p className="p-lg">Document dipilih</p>
					</div>
					<button
						className="ph-2 h-12 bd-rs-6 d-flex ai-center jc-center bg-success-1 ml-a cur-p"
						onClick={() => setModalShow(true)}
						disabled={cart.numberCart === 0}
					>
						<span className="text p-lg mh-2 tc-success-5">Indexing</span>
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
				<title>Dox - Indexing</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				<ModalForm
					modal={modalShow}
					hide={onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<ModalDetach
					modal={modalDettach}
					hide={onHideDettach}
					modalSet={setModalShowDettach}
					valueModalSet={false}
					folder_id={folderId}
				/>
				<ModalAddReference
					modal={modalShowReference}
					hide={onHideReference}
					modalSet={setModalShowReference}
					valueModalSet={false}
					folder_id={folderId}
				/>
				<div className="d-flex jc-between w-100% mb-4">
					<h6>List Document belum terindexing</h6>
					<Cart />
				</div>
				<div style={{ marginBottom: 20 }}>
					<ModalFilter />
				</div>
				<DataTable tableHeader={header} tableBody={documentList?.Documents} />
				<Pagination
					pageCount={documentList?.Meta?.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default TableIndexingPage;
