import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { AddCart, AddCartAll, getBorrowList } from "actions/BorrowItemAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { SearchInput } from "./FilterInput";
import ModalForm from "./ModalForm";
import "./page.scoped.scss";
import _ from "lodash";
import { selectBorrowItems } from "store/Selector/BorrowItemSelector";

const BorrowBoxPage = () => {
	const [modalShow, setModalShow] = useState(false);
	const [cart, setCart] = useState<Partial<any>>({});
	const borrowList = useSelector(selectBorrowItems);
	const cartStash = useSelector((state: RootStateOrAny) => state?.pickUpItems);
	useEffect(() => {
		setCart(cartStash);
	}, []);

	useEffect(() => {
		setCart(cartStash);
	}, [cartStash]);

	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
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

	const allData = async () => {
		const newData = borrowList?.BorrowList.map(item => {
			return item?.id;
		});
		dispatch(await AddCartAll(newData));
	};

	const checkCart = id => {
		if (cart) {
			const checkCart = cart?.Cart.indexOf(String(id));
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
			url: "Box-Detail/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "Code Box",
			prop: "code_box",
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Custome Code Box",
			prop: "custom_code_box",
			sortable: true,
			cellProps: {
				style: { width: "40%" },
			},
			cell: row => {
				return row?.custom_code_box ? row?.custom_code_box : "-";
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
							<button
								className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-success"
								style={{ marginTop: -3, color: "#fff" }}
								onClick={allData}
							>
								<i className="fas fa-box-check"></i>
							</button>
						</span>
						<h5 className="text ff-1-bd mr-3">{borrowList?.Cart?.length}</h5>
						<p className="p-lg">Box dipilih</p>
					</div>
					<button
						className="ph-2 h-12 bd-rs-6 d-flex ai-center jc-center bg-success-1 ml-a cur-p"
						onClick={() => setModalShow(true)}
						disabled={borrowList?.Cart?.length <= 0}
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
				<title>Dox - Borrow Box</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				<ModalForm
					modal={modalShow}
					hide={_onHide}
					modalSet={setModalShow}
					valueModalSet={false}
				/>
				<div
					style={{
						marginBottom: 20,
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<SearchInput />
				</div>
				<DataTable
					tableHeader={header}
					tableBody={borrowList?.BorrowList ? borrowList.BorrowList : []}
				/>
				<Pagination
					pageCount={borrowList?.Meta?.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
				<Cart />
			</PageWrapper>
		</>
	);
};

export default BorrowBoxPage;
