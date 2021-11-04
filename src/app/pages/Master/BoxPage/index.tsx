import React, { useState, useRef, useEffect, Component } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import { ModalDelete } from "../Components/DeleteModal";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedBoxResponse from "app/pages/Interface/box";
import { Pagination } from "app/components/Pagination";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import box from "store/box";
import { getBoxesList } from "actions/userActions";
import { useDispatch } from "react-redux";
import { configureAppStore } from "store/configureStore";
import { GET_BOXES_LIST } from "actions/userActions";

export function BoxPage() {
	const [data, setData] = useState([]);
	// const userName = useSelect(state => state.data);

	const [pageCount, setpageCount] = useState(0);

	let limit = 20;

	const pagination = async currentPage => {
		const { data } = await api.get<PaginatedBoxResponse>(
			`/boxes?page=${currentPage}&_limit=${limit}`,
		);
		const newData = data.data as any;
		return newData;
	};

	const handlePageClick = async data => {
		let currentPage = data.selected + 1;
		const commentsFormServer = await pagination(currentPage);
		setData(commentsFormServer);
	};

	const onDelete = key => {
		Swal.fire({
			text: "Apakah anda ingin menghapus data ini?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Hapus",
		}).then(willDelete => {
			if (willDelete.isConfirmed) {
				api.delete(`/boxes/${key}`).then(() => {
					getBoxes();
				});
			}
		});
	};

	const action = key => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Box-Detail/" + key,
			type: 1,
			// action: NavLinkAction("/Box-Detail"),
		},
		{
			icon: "fa-copy ",
			title: "Duplicate",
			type: 2,
			// action: NavLinkAction("/Box-Detail"),
		},
		{
			icon: "fa-edit",
			title: "Edit",
			type: 1,
			// action: NavLinkAction("/Box-Detail"),
		},
		{
			icon: "fa-trash-alt",
			title: "Delete",
			titleClass: "tc-danger-5",
			type: 2,
			onclick: onDelete,
			id: key,
			url: "",
			// action: NavLinkAction("/Box-Detail"),
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
				// return (
				// 	<Link to={"Box-Detail/" + row.key}>
				// 		<Button color="dark" className="mr-2">
				// 			Detail
				// 		</Button>
				// 	</Link>
				// );
				return <DropdownAction list={action(row.key)} />;
			},
		},
	];

	// API hit.
	async function getBoxes() {
		const { data } = await api.get<PaginatedBoxResponse>(
			`/boxes?page=1&limit=${limit}`,
		);
		console.log(data.data);
		const newData = data.data as any;
		setData(newData);
		setpageCount(Math.ceil(data.meta.last_page));
	}

	useEffect(() => {
		getBoxes();
	}, []);

	//-------REDUX
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(getBoxesList())
	// }, [dispatch])

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
				<PageHeader breadcrumb={["Master", "Box"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={data} />
				<Pagination pageCount={pageCount} onPageChange={handlePageClick} />
			</PageWrapper>
		</>
	);
}
