import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import { Pagination } from "app/components/Pagination";
import { getActivityLogList } from "actions/ActivityLogAction";
import { useDispatch, useSelector } from "react-redux";
import { selectActivityLogs } from "store/Selector/ActivityLogSelector";
import momentTZ from "moment-timezone";

const ActivityLog = () => {
	momentTZ.locale();
	momentTZ.tz.setDefault("Asia/Jakarta");
	const activityLog = useSelector(selectActivityLogs);
	const dispatch = useDispatch();
	const FetchData = (page = 1) => {
		dispatch(getActivityLogList(page));
	};
	const moment = require("moment-timezone");
	useEffect(() => {
		FetchData();
	}, []);

	console.log("test >>>>", moment.locale("id"));

	const header = [
		{
			title: "Log Name",
			prop: "log_name",
			cellProps: {
				style: { width: "30%" },
			},
		},
		{
			title: "Deskripsi",
			prop: "description",
			cellProps: {
				style: { width: "30%" },
			},
		},
		{
			title: "Tanggal Log Dibuat",
			prop: "created_at",
			cell: row => {
				// return moment.tz(`${row?.created_at}`, 'Asia/Jakarta').format('MMMM Do YYYY, h:mm:ss a').toString().lang("id");
				return momentTZ(row?.created_at).format("MMMM Do YYYY, h:mm:ss a");
			},
		},
	];

	return (
		<>
			<Helmet>
				<title>Dox - Activity Log</title>
				<meta name="description" content="DOX" />
			</Helmet>
			<PageWrapper>
				<DataTable
					tableHeader={header}
					tableBody={activityLog?.ActivityLogs ? activityLog?.ActivityLogs : []}
				/>
				<Pagination
					pageCount={activityLog.Meta.last_page || 1}
					onPageChange={data => FetchData(data.selected + 1)}
				/>
			</PageWrapper>
		</>
	);
};

export default ActivityLog;
