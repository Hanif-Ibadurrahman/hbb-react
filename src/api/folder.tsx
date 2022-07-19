import { FolderInterfaceState } from "store/Types/FolderTypes";

import api from "./dox";
export const create = async (data: FolderInterfaceState) => {
	let payload = {
		no: data.no,
		company_id: data.company.id,
		division_id: data.division.id,
	};
	return api.post("/folders", payload);
};

export const update = async (data: FolderInterfaceState) => {
	let id = data.id;
	let payload = {
		no: data.no,
		company_id: data.company.id,
		division_id: data.division.id,
	};
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

export const getAllNotPage = async params => {
	return api
		.get(`/folders?per_page=999999999`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllFolderNotAssigned = async params => {
	return api
		.get(`/folders?per_page=999999999&is_assigned=false`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterFolders = async (data: FolderInterfaceState) => {
	let filter = {
		no: data.no,
	};

	return api
		.get(`/folders?no=${filter.no}`)
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
