import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import api from "./dox";
export const create = async (data: RequestBoxInterfaceState) => {
	let payload = {
		quantity: data.Quantity,
		delivered_at: data.DeliveredAt,
		note: data.Note,
		status: data.Status,
	};
	return api.post("/request-box", payload);
};

export const update = async (data: RequestBoxInterfaceState) => {
	let id = data.Id;
	let payload = {
		quantity: data.Quantity,
		delivered_at: data.DeliveredAt,
		note: data.Note,
		status: data.Status,
	};
	console.log(payload);
	return await api.put(`/request-box/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/request-box/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/request-box`, {
			params: params,
		})
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/request-box/${id}`);
};
