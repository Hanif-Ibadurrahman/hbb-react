import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
import { AddCartAssign } from "actions/IndexingAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalAssign";
import "./page.scoped.scss";
import _ from "lodash";
import { selectDocuemntsAssigned } from "store/Selector/DocumentSelector";
import { getDocumentsAssigned } from "actions/DocumentAction";

const AssignTable = props => {
	const [modalShow, setModalShow] = useState(false);
	const [cart, setCart] = useState<Partial<any>>({});
	const cartStash = useSelector((state: RootStateOrAny) => state?.indexings);
	const documentAssigned = useSelector(selectDocuemntsAssigned);
	const documentNoAssigned = documentAssigned.DocumentAssigned;
	function idExists(id) {
		return documentNoAssigned.some(function (el) {
			return el.id === id;
		});
	}

	const DocumentAssigned = (page = 1) => {
		dispatch(getDocumentsAssigned(page));
	};

	useEffect(() => {
		setCart(cartStash);
	}, []);

	useEffect(() => {
		setCart(cartStash);
	}, [cartStash]);

	const dispatch = useDispatch();

	const _onHide = () => {
		setModalShow(false);
	};

	const addCart = async id => {
		checkCart(id);
		dispatch(await AddCartAssign(id));
	};

	const checkCart = id => {
		if (cart) {
			const checkCart = cart?.Cart.indexOf(String(id));
		}
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
	];

	const actionNoAssign = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Document-Detail/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "No Document",
			prop: "no",
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
			cell: row => {
				return row?.no ? row?.no : "-";
			},
		},
		{
			title: "No Digital",
			prop: "no_digital",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return row?.no_digital ? row?.no_digital : "-";
			},
		},
		{
			title: "Kondisi",
			prop: "condition",
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			headerCell: () => {
				return (
					<div className="cur-p">
						{`Kondisi`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
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
				return (
					<DropdownAction
						list={
							idExists(row.id) === true
								? action(row.id)
								: actionNoAssign(row.id)
						}
					/>
				);
			},
		},
	];

	function Cart(): JSX.Element {
		return (
			<>
				<div className="ph-4 pv-4 bg-dark-contrast bd-tl-rs-4 bd-tr-rs-4 d-flex cart-indexing">
					<div className="d-flex ai-center">
						<span className="h-12 w-12 bd-rs-6 d-flex ai-center jc-center bg-light-shade mr-6">
							<span
								className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-medium-tint"
								style={{ marginTop: -3 }}
							>
								<i className="fas fa-box-check"></i>
							</span>
						</span>
						<h5 className="text ff-1-bd mr-3">{cart.NumberCartAssign}</h5>
						<p className="p-lg">Document Assign to</p>
					</div>
					<span
						className="ph-2 h-12 bd-rs-6 d-flex ai-center jc-center bg-success-1 ml-a cur-p"
						onClick={() => setModalShow(true)}
					>
						<span className="text p-lg mh-2 tc-success-5">Folder</span>
						<span
							className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-success-5"
							style={{ marginTop: -3 }}
						>
							<i className="fas fa-chevron-double-right tc-dark-contrast"></i>
						</span>
					</span>
				</div>
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>Dox - Borrow Box</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<div className="d-flex jc-between w-100% mb-4">
					<h6>List Document sudah terindexing</h6>
					<Cart />
				</div>
				<DataTable tableHeader={header} tableBody={props?.DataTable} />
			</PageWrapper>
		</>
	);
};

export default AssignTable;
