import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../dashboard.scoped.scss";
import { DataTable } from "../../../components/Datatables";
import { Card, CardHeader } from "../Components/CardDashboard";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import {
	getAllApprovedList
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";

export function DashboardSuperadmin() {
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const FetchData = (page = 1) => {
		dispatch(getAllApprovedList(page));
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
			title: "Id Request",
			prop: "id",
			cellProps: {
				style: { width: "40%" },
			},
		},
		{
			prop: 'created_at',
			sortable: true,
			cellProps: {
				style: { width: "20%" },
			},
			headerCell: (sortedProp) => {
				const isActive = sortedProp.prop === 'created_at';
				const order = sortedProp.isAscending ? 'Terlama' : 'Terbaru';

				return (
					<div className="cur-p">
						{`Tanggal Permintaan ${isActive ? `(${order})` : '(Inactive)'}`}
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

	const totalEntry = requestBoxes.ApprovalRequest.length
	const totalRequest = requestBoxes.RequestBoxes.length

	const user = localStorage.getItem("User");
	return (
		<>
			<Helmet>
				<title>Dox - Dashboard Superadmin</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>

			<div className="pos-r p-8 bg-primary-5">
				<h3 className="tc-dark-contrast mb-12 ff-1-bd">
					<span className="ff-1">Selamat Datang,</span>
					{user}
				</h3>
				<h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
				<div className="row w-100% mh-0 row-summary">
					<div className="col col-4 ph-0">
						<CardHeader
							icon="archive"
							total={totalEntry}
							text={["Entry", <br />, "Baru."]}
						/>
					</div>
					<div className="col col-4 ph-0 mh-4">
						<CardHeader
							icon="boxes"
							total={totalRequest}
							text={["Box", <br />, "Requested."]}
						/>
					</div>
					<div className="col col-4 ph-0">
						<CardHeader
							icon="truck-loading"
							total="10"
							text={["On-Going", <br />, "Delivery."]}
						/>
					</div>
				</div>
			</div>
			<div className="pos-r p-8 pt-0 mt-20">
				<h6 className="mb-3 pt-3">Today's Notifications.</h6>
				<div className="row w-100% mh-0">
					<div className="col col-12 ph-0 mr-2">
						<Card style={{ border: "1px solid rgba(0,0,0,.1)" }}>
							<DataTable tableHeader={header} tableBody={requestBoxes.ApprovalRequest} initialSort={{ prop: 'created_at', isAscending: true }} />
							<Pagination
								pageCount={requestBoxes.Meta.last_page}
								onPageChange={data => FetchData(data.selected + 1)}
							/>
						</Card>
					</div>
					{/* <div className="col col-4 ph-0 ml-2">
            <Card style={{ border: '1px solid rgba(0,0,0,.05)' }}></Card>
          </div> */}
				</div>
			</div>
		</>
	);
}
