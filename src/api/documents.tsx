import { identity } from "lodash";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import api from "./dox";
export const create = async (data: DocumentInterfaceState) => {
	let payload = {
		no: data.No,
		date: data.Date,
		detail: data.Detail,
		nominal: data.Nominal,
		active_year_for: data.ActiveYear,
		level_progress: data.LevelProgress,
		media_storage: data.MediaStorage,
		condition: data.Condition,
		amount: data.Amount,
		cross_point: data.CrossPoint,
		description: data.Description,
		no_digital: data.NoDigital,
		location: data.Location,
		status: data.Status,
	};
	return api.post("/documents", payload);
};

export const update = async (data: DocumentInterfaceState) => {
	let id = data.Id;
	let payload = {
		no: data.No,
		date: data.Date,
		detail: data.Detail,
		nominal: data.Nominal,
		active_year_for: data.ActiveYear,
		level_progress: data.LevelProgress,
		media_storage: data.MediaStorage,
		condition: data.Condition,
		amount: data.Amount,
		cross_point: data.CrossPoint,
		description: data.Description,
		no_digital: data.NoDigital,
		location: data.Location,
		status: data.Status,
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
