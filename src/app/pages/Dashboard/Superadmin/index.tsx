import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../dashboard.scoped.scss";
import { DataTable } from "../../../components/Datatables";
import { Card, CardHeader } from "../Components/CardDashboard";
import { Pagination } from "app/components/Pagination";
import { getAllApprovedList } from "actions/RequestBoxAction";
import { getCabinetsList } from "actions/CabinetAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import { selectCabinets } from "store/Selector/CabinetSelector";
import moment from "moment";
import { selectBoxes } from "store/Selector/BoxSelector";
import { getBoxesList } from "actions/BoxActions";
import { selectReturnItems } from "store/Selector/ReturnItemSelector";
import { getReturnList } from "actions/ReturnAction";
import { Bar } from "react-chartjs-2";
import DropdownAction from "app/pages/Master/Components/DropdownAction";

export function DashboardSuperadmin() {
	const user = localStorage.getItem("User");
	const requestBoxes = useSelector(selectRequestBoxes);
	const dispatch = useDispatch();
	const cabinets = useSelector(selectCabinets);
	const boxes = useSelector(selectBoxes);
	const returnItem = useSelector(selectReturnItems);
	const [title, setTitle] = useState("");
	const BoxData = (page = 1) => {
		dispatch(getBoxesList(page));
	};
	const FetchData = (page = 1) => {
		dispatch(getAllApprovedList(page));
	};
	const CabinetData = (page = 1) => {
		dispatch(getCabinetsList(page));
	};
	const ReturnData = (page = 1) => {
		dispatch(getReturnList(page));
	};
	useEffect(() => {
		CabinetData();
	}, []);
	useEffect(() => {
		BoxData();
	}, []);
	useEffect(() => {
		ReturnData();
	}, []);
	useEffect(() => {
		if (user === "superadmin") {
			return setTitle("List Pending Approval");
		} else if (user === "csradmin") {
			return setTitle("List Pending Approval");
		} else if (user === "csroperation") {
			return setTitle("List Pending Approval");
		} else {
			return setTitle("List Box Di Pinjam");
		}
	}, []);

	const totalCabinets = cabinets.Meta.total;
	const totalBox = boxes.Meta.total;
	const totalReturn = returnItem.Meta.total;

	const CardAdmin = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="archive"
						total={totalCabinets || 0}
						text={["Total", <br />, "Cabinet."]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total="0"
						text={["Cabinet", <br />, "Tersedia."]}
					/>
				</div>
				<div className="col col-4 ph-0">
					<CardHeader
						icon="boxes"
						total={totalBox || 0}
						text={["Total", <br />, "Box."]}
					/>
				</div>
			</div>
		);
	};
	const CardCustomer = () => {
		return (
			<div className="row w-100% mh-0 row-summary">
				<div className="col col-4 ph-0">
					<CardHeader
						icon="archive"
						total={totalBox || 0}
						text={["Total", <br />, "Box."]}
					/>
				</div>
				<div className="col col-4 ph-0 mh-4">
					<CardHeader
						icon="truck-loading"
						total={totalReturn || 0}
						text={["Box di", <br />, "Pinjam."]}
					/>
				</div>
			</div>
		);
	};
	const CardDashboard = () => {
		if (user === "superadmin") {
			return <CardAdmin />;
		} else if (user === "csradmin") {
			return <CardAdmin />;
		} else if (user === "csroperation") {
			return <CardAdmin />;
		} else {
			return <CardCustomer />;
		}
	};

	const chartData = {
		labels: ["Red", "Orange", "Blue"],
		datasets: [
			{
				label: "Popularity of colours",
				data: [55, 23, 96],
				// you can set indiviual colors for each bar
				backgroundColor: [
					"rgba(255, 255, 255, 0.6)",
					"rgba(255, 255, 255, 0.6)",
					"rgba(255, 255, 255, 0.6)",
				],
				borderWidth: 1,
			},
		],
	};

	const action = id => [
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
				<title>Dox - Dashboard Superadmin</title>
				<meta
					name="description"
					content="A React Boilerplate application homepage"
				/>
			</Helmet>
			<div className="pos-r p-8 bg-primary-5">
				<h3 className="tc-dark-contrast mb-12 ff-1-bd">
					<span className="ff-1 username text txtf-c">Selamat Datang,</span>
					{user}
				</h3>
				<h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
				<CardDashboard />
			</div>
			<div className="pos-r p-8 pt-0 mt-20">
				<h6 className="mb-3 pt-3">{title}</h6>
				<div className="row w-100% mh-0">
					<div className="col col-12 ph-0 mr-2">
						<Card style={{ border: "1px solid rgba(0,0,0,.1)" }}>
							<DataTable
								tableHeader={header}
								tableBody={
									user === "superadmin"
										? requestBoxes.ApprovalRequest
										: returnItem.ReturnList
								}
							/>
							<Pagination
								pageCount={returnItem.Meta.last_page}
								onPageChange={data => FetchData(data.selected + 1)}
							/>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
