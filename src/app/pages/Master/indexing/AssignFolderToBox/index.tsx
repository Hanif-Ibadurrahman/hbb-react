import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/pages/Master/Components/DropdownAction";
import { AddCartAssign } from "actions/IndexingAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalForm from "./ModalAssign";
import ModalDetach from "./ModalDettach";
import { Pagination } from "app/components/Pagination";
import {
	selectFolders,
	selectFoldersAssigned,
} from "store/Selector/FolderSelector";
import { SearchInput } from "../../FolderPage/FilterInput";
import {
	getFoldersList,
	getFoldersListNotAssign,
	SearchFolders,
} from "actions/FolderAction";
import "../AssignDocToFolder/page.scoped.scss";

const AssignFolderToBox = () => {
	const [modalShow, setModalShow] = useState(false);
	const [cart, setCart] = useState<Partial<any>>({});
	const cartStash = useSelector((state: RootStateOrAny) => state?.indexings);
	const folderNotAssigned = useSelector(selectFoldersAssigned);
	const folderNotAssignedtoBox = folderNotAssigned?.FolderAssigned;
	const [boxId, setBoxId] = useState("");
	const [modalDettach, setModalShowDettach] = useState(false);
	const folders = useSelector(selectFolders);

	const FolderNoAssigned = (page = 1) => {
		dispatch(getFoldersListNotAssign(page));
	};

	useEffect(() => {
		FolderNoAssigned();
	}, []);

	useEffect(() => {
		setCart(cartStash);
	}, []);

	useEffect(() => {
		setCart(cartStash);
	}, [cartStash]);

	const FetchData = (page = 1) => {
		dispatch(getFoldersList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	function idExists(id) {
		return folderNotAssignedtoBox.some(function (el) {
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

	const addCart = async id => {
		checkCart(id);
		dispatch(await AddCartAssign(id));
	};

	const checkCart = id => {
		if (cart) {
			return cart?.Cart.indexOf(String(id));
		}
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Folder-Detail/" + id,
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
	];

	const actionDetach = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Folder-Detail/" + id,
			type: 1,
		},
		{
			icon: "fa-hand-holding-box",
			title: "Remove Box",
			onclick: () => {
				setBoxId(id);
				setModalShowDettach(true);
			},
			dispatch: dispatch,
			row: id,
			type: 2,
		},
	];

	const header = [
		{
			title: "No Folder",
			prop: "no",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			title: "Status Folder",
			prop: "status",
			cellProps: {
				style: { width: "40%" },
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
						<span className="h-12 w-12 bd-rs-6 d-flex ai-center jc-center bg-light-shade mr-6">
							<span
								className="icon h-9 w-9 bd-rs-6 d-flex ai-center jc-center bg-medium-tint"
								style={{ marginTop: -3 }}
							>
								<i className="fas fa-box-check"></i>
							</span>
						</span>
						<h5 className="text ff-1-bd mr-3">{cartStash?.NumberCartAssign}</h5>
						<p className="p-lg">Folder dipilih</p>
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
				<ModalDetach
					modal={modalDettach}
					hide={onHideDettach}
					modalSet={setModalShowDettach}
					valueModalSet={false}
					box_id={boxId}
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
					tableBody={folders.Folders ? folders.Folders : []}
				/>
				<Pagination
					pageCount={folders?.Meta?.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
				<Cart />
			</PageWrapper>
		</>
	);
};

export default AssignFolderToBox;
