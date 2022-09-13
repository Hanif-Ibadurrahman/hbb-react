import { identity } from "lodash";
import { DivisionInterfaceState } from "store/Types/DivisionTypes";
import api from "./dox";
export const create = async (data: DivisionInterfaceState) => {
	let payload = {
		name: data.name,
	};
	return api.post("/divisions", payload);
};

export const update = async (data: DivisionInterfaceState) => {
	let id = data.id;
	let payload = {
		name: data.name,
	};
	return await api.put(`/divisions/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/divisions/${id}`);
};

export const getAll = async (page, company_id: String | null = null) => {
	return api
		.get(`/divisions`, {
			params: {
				page: page,
				company_id: company_id,
			},
		})
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
	return api.delete(`/divisions/${id}`);
};
