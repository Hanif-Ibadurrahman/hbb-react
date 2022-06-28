import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Approval/Components/PageHeader";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import {
	getAllApprovedList,
	SearchAllApprovedList,
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";
import { SearchInput } from "./FilterPreviewApproval";

const ApprovalPreview = () => {
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const FetchData = (page = 1) => {
		if (requestBoxes.RequestBoxes.length === 0) {
			dispatch(getAllApprovedList(page));
		} else {
			dispatch(SearchAllApprovedList);
		}
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
			icon: "fa-print",
			title: "Print",
			url: "/Print-Approval/" + id,
			type: 1,
		},
	];

	const header = [
		{
			title: "Tanggal Permintaan",
			sortable: true,
			prop: "created_at",
			headerCell: () => {
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
				return (
					<>
						{row.type == "request-box"
							? "Request Box"
							: row.type == "pickup-box"
							? "Pick Up Box"
							: row.type == "borrow-item"
							? "Peminjaman"
							: row.type == "return-item"
							? "Pengembalian"
							: null}
					</>
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
				<SearchInput />
				<DataTable
					tableHeader={header}
					tableBody={requestBoxes?.ApprovalRequest}
				/>
				<Pagination
					pageCount={requestBoxes.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ApprovalPreview;
