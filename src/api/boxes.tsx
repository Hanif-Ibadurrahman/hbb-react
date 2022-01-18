import { identity } from "lodash";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import api from "./dox";
export const create = async (data: BoxInterfaceState) => {
	let payload = {
		code_box: data.code_box,
	};
	return api.post("/boxes", payload);
};

export const update = async (data: BoxInterfaceState) => {
	let id = data.id;
	let payload = {
		code_box: data.code_box,
	};
	console.log(payload);
	return await api.put(`/boxes/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/boxes/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/boxes?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/boxes/${id}`);
};
