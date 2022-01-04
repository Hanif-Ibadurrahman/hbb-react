import { FolderInterfaceState } from "store/Types/FolderTypes";

import api from "./dox";
export const create = async (data: FolderInterfaceState) => {
	let payload = {
		no: data.No,
		location: data.Location,
		status: data.Status,
		sign_code: data.SignCode,
	};
	return api.post("/folders", payload);
};

export const update = async (data: FolderInterfaceState) => {
	let id = data.Id;
	let payload = {
		no: data.No,
		location: data.Location,
		status: data.Status,
		sign_code: data.SignCode,
	};
	console.log(payload);
	return await api.put(`/folders/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/folders/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/folders?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/folders/${id}`);
};
