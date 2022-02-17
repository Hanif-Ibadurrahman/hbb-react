import { identity } from "lodash";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import api from "./dox";
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
	};
	return api.post("/documents", payload);
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
	};
	console.log(payload);
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
