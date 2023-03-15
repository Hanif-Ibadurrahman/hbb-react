import { DocumentInterfaceState } from "store/Types/DocumentTypes";
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

export const getAllNotPage = async params => {
	return api
		.get(`/folders?per_page=20`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllFolderNotAssigned = async params => {
	return api
		.get(`/folders?per_page=20&is_assigned=false`)
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

export const filterDocuemntFolder = async (
	data: DocumentInterfaceState,
	id,
) => {
	let filter = {
		id: id,
		no: data.no,
		detail: data.detail,
		active_year_for: data.active_year_for,
		level_progress: data.level_progress,
		media_storage: data.media_storage,
		condition: data.condition,
		description: data.description,
		status: data.status,
	};

	if (filter.status !== undefined && filter.status !== "") {
		return api.get(`/folders/${id}?status=${filter.status}`);
	} else if (filter.description !== undefined && filter.description !== "") {
		return api.get(`/folders/${id}?description=${filter.description}`);
	} else if (filter.condition !== undefined && filter.condition !== "") {
		return api.get(`/folders/${id}?condition=${filter.condition}`);
	} else if (
		filter.media_storage !== undefined &&
		filter.media_storage !== ""
	) {
		return api.get(`/folders/${id}?media_storage=${filter.media_storage}`);
	} else if (
		filter.level_progress !== undefined &&
		filter.level_progress !== ""
	) {
		return api.get(`/folders/${id}?level_progress=${filter.level_progress}`);
	} else if (
		filter.active_year_for !== undefined &&
		filter.active_year_for !== ""
	) {
		return api.get(`/folders/${id}?active_year_for=${filter.active_year_for}`);
	} else if (filter.detail !== undefined && filter.detail !== "") {
		return api.get(`/folders/${id}?detail=${filter.detail}`);
	} else if (filter.no !== undefined && filter.no !== "") {
		return api.get(`/folders/${id}?no=${filter.no}`);
	} else {
		return api.get(`/documents`);
	}
};
