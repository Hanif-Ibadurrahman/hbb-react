import { DocumentInterfaceState, UploadFile } from "store/Types/DocumentTypes";
import api from "./dox";
import fs from "fs";
import FileDownload from "js-file-download";

export const create = async (data: DocumentInterfaceState) => {
	let payload = {
		no: data.no,
		date: data.date,
		detail: data.detail,
		nominal: data.nominal,
		active_year_for: data.active_year_for,
		level_progress: data.level_progress,
		media_storage: data.media_storage,
		condition: data.condition,
		amount: data.amount,
		cross_point: data.cross_point,
		description: data.description,
		no_digital: data.no_digital,
		location: data.location,
		status: data.status,
		sign_code: data.sign_code,
		company_id: data.company.id,
		division_id: data.division.id,
	};
	return api.post("/documents", payload);
};

export const uploadFile = async data => {
	console.log("data upload >>", data);
	var formdata = new FormData();
	formdata.append("file", data, "[PROXY]");
	console.log("form data >>", formdata);
	const token = localStorage.getItem("Token");

	const response = await fetch(
		"http://103.93.57.36:8008/uploads/excel/document",
		{
			method: "POST",
			body: formdata,
			redirect: "follow",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	console.log("data >>", response);
	return response;
};

export const downloadFile = () => {
	return api({
		method: "GET",
		url: "/downloads/document/template",
		responseType: "blob",
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const update = async (data: DocumentInterfaceState) => {
	let id = data.id;
	let payload = {
		no: data.no,
		date: data.date,
		detail: data.detail,
		nominal: data.nominal,
		active_year_for: data.active_year_for,
		level_progress: data.level_progress,
		media_storage: data.media_storage,
		condition: data.condition,
		amount: data.amount,
		cross_point: data.cross_point,
		description: data.description,
		no_digital: data.no_digital,
		location: data.location,
		status: data.status,
		sign_code: data.sign_code,
		company_id: data.company.id,
		division_id: data.division.id,
	};
	return await api.put(`/documents/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/documents/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/documents?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/documents/${id}`);
};

export const filter = async (data: DocumentInterfaceState) => {
	let filter = {
		no: data.no,
		detail: data.detail,
		active_year_for: data.active_year_for > 0 ? data.active_year_for : "",
		level_progress: data.level_progress,
		media_storage: data.media_storage,
		condition: data.condition,
		description: data.description,
		status: data.status,
	};

	return api.get(
		`/documents?no=${filter.no}&detail=${filter.detail}&active_year_for=${filter.active_year_for}&level_progress=${filter.level_progress}&media_storage=${filter.media_storage}&condition=${filter.condition}&description=${filter.description}&status=${filter.status}`,
	);
};
