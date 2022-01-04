import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
// import PageHeader from "../Components/PageHeader";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
// import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getBoxesList, getBoxDetail } from "actions/BoxActions";
import { AddCart, getBorrowList } from "actions/BorrowItemAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Alert from "app/components/Alerts";
import { selectBoxes } from "store/Selector/BoxSelector";
import ModalForm from "./ModalForm";
import "./page.scoped.scss";
import _ from "lodash";
import {
	selectBorrowItem,
	selectBorrowItems,
} from "store/Selector/BorrowItemSelector";

const BorrowBoxPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [cart, setCart] = useState<Partial<any>>({});
	const boxes = useSelector(selectBoxes);
	const borrowList = useSelector(selectBorrowItems);
	const cartStash = useSelector((state: RootStateOrAny) => state?.borrowItems);

	// console.log("Total Cart Tash>>>>", Cart.length);

	useEffect(() => {
		setCart(cartStash);
		console.log("CART NEW>>", cart.Cart);
	}, []);

	useEffect(() => {
		setCart(cartStash);
		console.log("CART NEW>>", cart.Cart);
	}, [cartStash]);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		// dispatch(getBoxesList(page));
		dispatch(getBorrowList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const _onHide = () => {
		setModalShow(false);
	};

	const addCart = async id => {
		checkCart(id);
		dispatch(await AddCart(id));
	};

	const checkCart = id => {
		if (cart) {
			console.log("total cart", cart?.numberCart, cart?.Cart);
			console.log("id onclick", id);
			const checkCart = cart?.Cart.indexOf(String(id));
			console.log("check cart index: ", checkCart);
		}
	};

	const action = id => [
		{
			icon: "fa-hand-holding-box",
			title: "Pickup",
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
			type: 2,
			onclick: "",
			dispatch: dispatch,
			row: id,
		},
	];

	const header = [
		{
			title: "Code Box",
			prop: "code_box",
			sortable: true,
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

	function Cart(): JSX.Element {
		return (
			<>
				<div className="ph-4 pv-4 bg-dark-contrast bd-tl-rs-4 bd-tr-rs-4 d-flex cart-popup">
					<div className="d-flex ai-center">
						<span className="h-12 w-12 bd-rs-6 d-flex ai-center jc-center bg-light-shade mr-6">
							<span
								className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-medium-tint"
								style={{ marginTop: -3 }}
							>
								<i className="fas fa-box-check"></i>
							</span>
						</span>
						<h5 className="text ff-1-bd mr-3">{cart.numberCart}</h5>
						<p className="p-lg">Box dipilih</p>
					</div>
					<span
						className="ph-2 h-12 bd-rs-6 d-flex ai-center jc-center bg-success-1 ml-a cur-p"
						onClick={() => setModalShow(true)}
					>
						<span className="text p-lg mh-2 tc-success-5">Proses</span>
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
				<DataTable tableHeader={header} tableBody={borrowList.BorrowList} />
				<Pagination
					pageCount={boxes.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
				<Cart />
			</PageWrapper>
		</>
	);
};

export default BorrowBoxPage;
