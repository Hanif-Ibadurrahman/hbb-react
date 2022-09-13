import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { getAllRequestList } from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import Badge from "react-bootstrap/Badge";
import moment from "moment";

const RequestHistory = () => {
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const user = localStorage.getItem("User");

	const FetchData = (page = 1) => {
		dispatch(getAllRequestList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const action = id => [
		{
			icon: "fa-search",
			title: "Detail",
			url: "DetailRequestBox/" + id,
			type: 1,
		},
		{
			icon: "fa-edit",
			title: "Surat Jalan",
			url: "/Customer/DeliveryNote/" + id,
			type: 1,
		},
	];

	const header = [
		{
			prop: "created_at",
			sortable: true,
			cellProps: {
				style: { width: "25%" },
			},
			headerCell: sortedProp => {
				return (
					<div className="cur-p">
						{`Tanggal Permintaan`}
						<i className="fas fa-sort-alt ml-2"></i>
					</div>
				);
			},
			cell: row => {
				return moment(row.created_at).format("DD MMMM YYYY");
			},
		},
		{
			title: "Tipe Permintaan",
			prop: "type",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				const text = row?.type?.toUpperCase();
				return <>{text.replaceAll("-", " ")}</>;
			},
		},
		{
			title: "Keterangan",
			prop: "note",
			cellProps: {
				style: { width: "25%" },
			},
		},
		{
			title: "Status",
			prop: "status",
			cellProps: {
				style: { width: "10%" },
			},
			cell: row => {
				const text = row?.status?.toUpperCase();
				const badge = row?.status === "rejected" ? "danger" : "success";
				return <Badge bg={badge}>{text}</Badge>;
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

	const headerAdmin = [
		{
			title: "Perusahaan",
			prop: "company",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return row?.customer?.company?.name;
			},
		},
		{
			title: "Customer",
			prop: "customer",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return row?.customer?.name;
			},
		},
		{
			title: "Tanggal Permintaan",
			prop: "created_at",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				return moment(row?.created_at).format("DD MMMM YYYY");
			},
		},
		{
			title: "Tipe Permintaan",
			prop: "type",
			cellProps: {
				style: { width: "20%" },
			},
			cell: row => {
				const text = row?.type?.toUpperCase();
				return <>{text.replaceAll("-", " ")}</>;
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
				<title>Dox - Request Box</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				<DataTable
					tableHeader={
						user === "csroperation" || user === "csradmin"
							? headerAdmin
							: header
					}
					tableBody={
						requestBoxes?.RequestBoxes ? requestBoxes?.RequestBoxes : []
					}
					initialSort={{ prop: "created_at", isAscending: true }}
				/>
				<Pagination
					pageCount={requestBoxes.Meta.last_page}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default RequestHistory;
