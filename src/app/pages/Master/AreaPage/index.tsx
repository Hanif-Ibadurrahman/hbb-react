import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { ModalForm } from "./ModalForm";
import PageHeader from "../Components/PageHeader";
import DropdownAction from "../Components/DropdownAction";
import api from "../../../../api/dox";
import PaginatedAreaResponse from "app/pages/Interface/folder";
import { Pagination } from "app/components/Pagination";
import Swal from "sweetalert2";

export function AreaPage() {
	const [data, setData] = useState([]);

	const [pageCount, setpageCount] = useState(0);

	let limit = 20;

	const pagination = async currentPage => {
		const { data } = await api.get<PaginatedAreaResponse>(
			`/areas?page=${currentPage}&_limit=${limit}`,
		);
		const newData = data.data as any;
		return newData;
	};

	const handlePageClick = async data => {
		console.log(data.selected);
		let currentPage = data.selected + 1;
		const commentsFormServer = await pagination(currentPage);
		setData(commentsFormServer);
	};

	// API hit.
	async function getAreas() {
		const { data } = await api.get<PaginatedAreaResponse>(
			`/areas?page=1&limit=${limit}`,
		);
		console.log(data.data);
		const newData = data.data as any;
		setData(newData);
		setpageCount(Math.ceil(data.meta.last_page));
	}

	useEffect(() => {
		getAreas();
	}, []);

	const onDelete = id => {
		Swal.fire({
			text: "Apakah anda ingin menghapus data ini?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			confirmButtonText: "Hapus",
		}).then(willDelete => {
			if (willDelete.isConfirmed) {
				api.delete(`/areas/${id}`).then(() => {
					getAreas();
				});
				Swal.fire({
					text: "Data Berhasil di Hapus",
					icon: "success",
					confirmButtonColor: "#198754",
					confirmButtonText: "Ok",
				});
			}
		});
	};

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "Box-Detail/" + id,
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
			id: id,
			url: "",
			// action: NavLinkAction("/Box-Detail"),
		},
	];

	const header = [
		{
			title: "Nama Area",
			prop: "name",
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
				// return (
				// 	<Link to={"Box-Detail/" + row.id}>
				// 		<Button color="dark" className="mr-2">
				// 			Detail
				// 		</Button>
				// 	</Link>
				// );
			},
		},
	];

	return (
		<>
			<Helmet>
				<title>Dox - Master Area</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<PageWrapper>
				<PageHeader breadcrumb={["Master", "Area"]} addForm={<ModalForm />} />
				<DataTable tableHeader={header} tableBody={data} />
				<Pagination pageCount={pageCount} onPageChange={handlePageClick} />
			</PageWrapper>
		</>
	);
}
