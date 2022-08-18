import React, { useEffect } from "react";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import { useDispatch, useSelector } from "react-redux";
import { getRequestBoxesList } from "actions/RequestBoxAction";

function DataSidebar() {
	const dispatch = useDispatch();

	const FetchData = (page = 1) => {
		dispatch(getRequestBoxesList(page));
	};

	useEffect(() => {
		FetchData();
	}, []);

	const requestBoxes = useSelector(selectRequestBoxes);
	const notif = requestBoxes.Meta.total;
	console.log("testing notif", notif);
	return { notif };
}

export const DashboardData = [
	{
		title: "Superadmin",
		icon: "",
		link: "/Dashboard/Superadmin",
	},
	{
		title: "Admin CSR",
		icon: "",
		link: "/Dashboard/CSR",
	},
	{
		title: "Admin RC",
		icon: "",
		link: "/Dashboard/RC",
	},
	{
		title: "Admin Transport",
		icon: "",
		link: "/Dashboard/Transport",
	},
];

export const PeminjamanData = [
	{
		title: "Request Box",
		icon: "",
		link: "/Approval-Admin/RequestBox",
		notifications: DataSidebar,
	},
	{
		title: "Pickup Box",
		icon: "",
		link: "/Approval-Admin/PickupBox",
		notifications: "",
	},
];

export const ApprovalOperation = [
	{
		title: "Request Box",
		icon: "",
		link: "/Approval-Operation/RequestBox",
		notifications: "",
	},
];

export const MasterData = [
	{
		title: "Box",
		icon: "",
		link: "/Box",
	},
	{
		title: "Folder",
		icon: "",
		link: "/Folder",
	},
	{
		title: "Dokumen",
		icon: "",
		link: "/Document",
	},
	{
		title: "Lemari",
		icon: "",
		link: "/Cabinet",
	},
	{
		title: "Area",
		icon: "",
		link: "/Area",
	},
	{
		title: "Room",
		icon: "",
		link: "/Room",
	},
	{
		title: "Kendaraan",
		icon: "",
		link: "/Car",
	},
	{
		title: "Company",
		icon: "",
		link: "/Company",
	},
	{
		title: "Customer",
		icon: "",
		link: "/CustomerPage",
	},
	{
		title: "Staff",
		icon: "",
		link: "/StaffPage",
	},
	{
		title: "Satuan Kerja",
		icon: "",
		link: "/DivisionPage",
	},
	{
		title: "Klasifikasi",
		icon: "",
		link: "/ClassificationPage",
	},
];

export const ArchiverMasterData = [
	{
		title: "Indexing Dokumen",
		icon: "",
		link: "/Indexing",
	},
	{
		title: "Document - Folder",
		icon: "",
		link: "/AssignDocToFolder",
	},
	{
		title: "Folder - Box",
		icon: "",
		link: "/AssignFolderToBox",
	},
];

export const CustomerMasterData = [
	{
		title: "Box",
		icon: "",
		link: "/Box",
	},
	{
		title: "Folder",
		icon: "",
		link: "/folder",
	},
	{
		title: "Dokumen",
		icon: "",
		link: "/document",
	},
];

export const MasterCustomer = [
	{
		title: "Box",
		icon: "",
		link: "/Box",
	},
	{
		title: "Folder",
		icon: "",
		link: "/Folder",
	},
	{
		title: "Dokumen",
		icon: "",
		link: "/Document",
	},
];
