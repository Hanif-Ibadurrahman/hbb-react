import { identity } from "lodash";
import { ClassificationInterfaceState } from "store/Types/ClassificationTypes";
import api from "./dox";

export const create = async (data: ClassificationInterfaceState) => {
	let payload = {
		name: data.name,
		code_classification: data.code_classification,
		type: data.type,
		retention_period: data.retention_period,
		company_id: data.company.id,
	};
	return api.post("/classifications", payload);
};

export const update = async (data: ClassificationInterfaceState) => {
	let id = data.id;
	let payload = {
		name: data.name,
		code_classification: data.code_classification,
		type: data.type,
		retention_period: data.retention_period,
		company_id: data.company.id,
	};
	console.log(payload);
	return await api.put(`/classifications/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/classifications/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/classifications?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterClassification = async (
	data: ClassificationInterfaceState,
) => {
	let filter = {
		name: data.name,
		// code_classification: data.code_classification,
		// type: data.type,
	};

	return api
		.get(`/classifications?name=${filter.name}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/classifications/${id}`);
};
