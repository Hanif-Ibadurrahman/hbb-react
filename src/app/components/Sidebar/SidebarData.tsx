import React, { useEffect, useState } from "react";
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
	// {
	// 	title: "Berkas",
	// 	icon: "",
	// 	link: "/Berkas",
	// },
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
	// {
	// 	title: "Ruangan",
	// 	icon: "",
	// 	link: "/Room",
	// },
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
	// {
	// 	title: "Transportasi",
	// 	icon: "",
	// 	link: "/Car",
	// },
	// {
	// 	title: "Record Center",
	// 	icon: "",
	// 	link: "/Record-Center",
	// },
	// {
	// 	title: "Mobil",
	// 	icon: "",
	// 	link: "/Car",
	// },
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
		title: "Company",
		icon: "",
		link: "/Company",
	},
	// {
	// 	title: "Transporter",
	// 	icon: "",
	// 	link: "/Trasnporter",
	// },
	// {
	// 	title: "Archiver",
	// 	icon: "",
	// 	link: "/Archiver",
	// },
	{
		title: "Divisi",
		icon: "",
		link: "/DivisionPage",
	},
	// {
	// 	title: "Duplikat Dokumen",
	// 	icon: "",
	// 	link: "/Duplikat-Dokumen",
	// },
	// {
	// 	title: "Daftar Musnah",
	// 	icon: "",
	// 	link: "/Daftar-Musnah",
	// },
	// {
	// 	title: "Masa Retensi",
	// 	icon: "",
	// 	link: "/Masa-Retensi",
	// },
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
