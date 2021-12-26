import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
// import PageHeader from "../Components/PageHeader";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
// import ModalForm from "./ModalForm";
import { Pagination } from "app/components/Pagination";
import { getBoxesList, getBoxDetail } from "actions/BoxActions";
import { AddCart } from "actions/BorrowItemAction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "app/components/Alerts";
import { selectBoxes } from "store/Selector/BoxSelector";
import { ConfirmationModal } from "./components/ConfirmationModal";
import "./page.scoped.scss";
import {
	selectBorrowItem,
	selectBorrowItems,
} from "store/Selector/BorrowItemSelector";

const BorrowBoxPage = () => {
	const [showAlertSuccess, setShowAlertSuccess] = useState(false);
	const [showAlertFailed, setShowAlertFailed] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [cartList, setCartList] = useState<number[]>([]);
	const [inArray, setInArray] = useState<number[]>([]);

	const boxes = useSelector(selectBoxes);
	const cart = useSelector(selectBorrowItems);
	console.log("total boy", cart.numberCart);
	console.log("cart boy", cart.Cart);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getBoxesList(page));
	};

	useEffect(() => {
		FetchData();
		setInArray([]);
	}, []);

	const _onHide = () => {
		setModalShow(false);
		setShowAlert(false);
	};

	const showEditForm = async id => {
		dispatch(getBoxDetail(id));
		setModalShow(true);
	};

	const addCart = async id => {
		console.log("id test", id);
		dispatch(await AddCart(id));
	};

	const action = id => [
		{
			icon: "fa-hand-holding-box",
			title: "Pickup",
			onclick: () => {
				// showEditForm(id);
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
					<ConfirmationModal />
					{/* <div className="d-flex ai-center">
            <span className="icon p-lg mr-2" style={{ marginTop: -3 }}>
              <i className="fas fa-exclamation-circle"></i>
            </span>
            <span className="text">Tidak ada box dipinjam</span>
          </div> */}
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

				{/* <ModalForm
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
				/> */}
				<DataTable tableHeader={header} tableBody={boxes.Boxes} />
				<Pagination
					pageCount={boxes.Meta.LastPage}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
				<Cart />
			</PageWrapper>
		</>
	);
};

export default BorrowBoxPage;
