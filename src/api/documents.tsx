import { DocumentInterfaceState, UploadFile } from "store/Types/DocumentTypes";
import api from "./dox";

export const create = async (data: DocumentInterfaceState) => {
	let payload = {
		no: data?.no,
		date: data?.date,
		detail: data?.detail,
		nominal: data?.nominal.toString(),
		active_year_for: data?.active_year_for.toString(),
		level_progress: data?.level_progress,
		media_storage: data?.media_storage,
		condition: data?.condition,
		amount: data?.amount,
		cross_point: data?.cross_point,
		description: data?.description,
		no_digital: data?.no_digital,
		location: data?.location,
		status: data?.status,
		sign_code: data?.sign_code,
		company_id: data?.company.id,
		division_id: data?.division.id,
	};
	return api.post("/documents", payload);
};

export const uploadFile = async data => {
	var formdata = new FormData();
	formdata.append("file", data, "[PROXY]");
	const token = localStorage.getItem("Token");

	const response = await fetch(
		`${process.env.REACT_APP_API_URL}uploads/excel/document`,
		{
			method: "POST",
			body: formdata,
			redirect: "follow",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
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
		no: data?.no,
		date: data?.date,
		detail: data?.detail,
		nominal: data?.nominal,
		active_year_for: data?.active_year_for,
		level_progress: data?.level_progress,
		media_storage: data?.media_storage,
		condition: data?.condition,
		amount: data?.amount,
		cross_point: data?.cross_point,
		description: data?.description,
		no_digital: data?.no_digital,
		location: data?.location,
		status: data?.status,
		sign_code: data?.sign_code,
		company_id: data?.company.id,
		division_id: data?.division.id,
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
			if (res.status === 401) {
				return localStorage.clear();
			} else {
				return res.data;
			}
		})
		.catch(error => {
			return error;
		});
};

export const getAllIndexing = async params => {
	return api
		.get(`/documents?page=${params}&is_indexed=false`)
		.then(res => {
			if (res.status === 401) {
				return localStorage.clear();
			} else {
				return res.data;
			}
		})
		.catch(error => {
			return error;
		});
};

export const getAllDocumentAssigned = async params => {
	return api
		.get(`/documents?per_page=999999999&is_assigned=false`)
		.then(res => {
			if (res.status === 401) {
				return localStorage.clear();
			} else {
				return res.data;
			}
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
		active_year_for: data.active_year_for,
		level_progress: data.level_progress,
		media_storage: data.media_storage,
		condition: data.condition,
		description: data.description,
		status: data.status,
	};

	if (filter.status !== undefined && filter.status !== "") {
		return api.get(`/documents?status=${filter.status}`);
	} else if (filter.description !== undefined && filter.description !== "") {
		return api.get(`/documents?description=${filter.description}`);
	} else if (filter.condition !== undefined && filter.condition !== "") {
		return api.get(`/documents?condition=${filter.condition}`);
	} else if (
		filter.media_storage !== undefined &&
		filter.media_storage !== ""
	) {
		return api.get(`/documents?media_storage=${filter.media_storage}`);
	} else if (
		filter.level_progress !== undefined &&
		filter.level_progress !== ""
	) {
		return api.get(`/documents?level_progress=${filter.level_progress}`);
	} else if (
		filter.active_year_for !== undefined &&
		filter.active_year_for !== ""
	) {
		return api.get(`/documents?active_year_for=${filter.active_year_for}`);
	} else if (filter.detail !== undefined && filter.detail !== "") {
		return api.get(`/documents?detail=${filter.detail}`);
	} else if (filter.no !== undefined && filter.no !== "") {
		return api.get(`/documents?no=${filter.no}`);
	} else {
		return api.get(`/documents`);
	}
};

export const deleteAttachmentDoc = async (id, document_file: string[]) => {
	let payload = {
		document_file: document_file,
	};
	return await api.put(`/documents/${id}/destroy/document-file`, payload);
};
