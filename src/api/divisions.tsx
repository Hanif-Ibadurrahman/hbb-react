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
	console.log(payload);
	return await api.put(`/divisions/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/divisions/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/divisions?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/divisions/${id}`);
};
