import { identity } from "lodash";
import { AreaInterfaceState } from "store/Types/AreaTypes";
import api from "./dox";
export const create = async (data: AreaInterfaceState) => {
	let payload = {
		code_area: data.code_area,
		name: data.name,
	};
	return api.post("/areas", payload);
};

export const update = async (data: AreaInterfaceState) => {
	let id = data.id;
	let payload = {
		code_area: data.code_area,
		name: data.name,
	};
	console.log(payload);
	return await api.put(`/areas/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/areas/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/areas?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/areas/${id}`);
};
