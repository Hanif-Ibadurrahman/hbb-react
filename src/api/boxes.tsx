import { identity } from "lodash";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import api from "./dox";
export const create = async (data: BoxInterfaceState) => {
	let payload = {
		code_box: data.code_box,
		company_id: data.company.id,
	};
	return api.post("/boxes", payload);
};

export const update = async (data: BoxInterfaceState) => {
	let id = data.id;
	let payload = {
		code_box: data.code_box,
		company_id: data.company.id,
	};
	console.log(payload);
	return await api.put(`/boxes/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/boxes/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/boxes?is_filled=true&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllNotPage = async params => {
	return api
		.get(`/boxes?per_page=999999999`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterBoxes = async (data: BoxInterfaceState) => {
	let filter = {
		code: data.code_box,
	};

	return api
		.get(`/boxes?code_box=${filter.code}`)
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
