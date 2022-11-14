import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Approval/Components/PageHeader";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import { getActivityLogList } from "actions/ActivityLogAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";
import { SearchInput } from "./FilterPreviewApproval";
import { selectActivityLogs } from "store/Selector/ActivityLogSelector";

const ActivityLog = () => {
	const activityLog = useSelector(selectActivityLogs);
	const dispatch = useDispatch();
	const FetchData = (page = 1) => {
		dispatch(getActivityLogList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

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
			// sortable: true,
			prop: "created_at",
		},
	];

	console.log("data >>", activityLog?.ActivityLogs);

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
