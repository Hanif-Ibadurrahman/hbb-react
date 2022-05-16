import {
	IndexingDocumentInterfaceState,
	IndexingInterfaceState,
} from "store/Types/IndexingTypes";
import api from "./dox";
export const create = async (data: IndexingInterfaceState) => {
	let payload = {
		index: data.index,
		date: data.date,
		type: data.type,
		classification: data.classification,
		area_id: data.area_id.id,
		room_id: data.room_id.id,
		retention_period: data.retention_period,
		date_retention: data.date_retention,
		is_permanent: data.is_permanent,
	};
	return api.post("/indexes", payload);
};

export const update = async (data: IndexingInterfaceState) => {
	let id = data.id;
	let payload = {
		index: data.index,
		date: data.date,
		type: data.type,
		classification: data.classification,
		area_id: data.area_id.id,
		room_id: data.room_id.id,
		retention_period: data.retention_period,
		date_retention: data.date_retention,
		is_permanent: data.is_permanent,
	};
	return await api.put(`/indexes/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/indexes/${id}`);
};

export const indexingDocument = async (
	data: IndexingDocumentInterfaceState,
) => {
	let id = data.id;
	let payload = {
		document_codes: data.document_codes,
	};
	return await api.put(`/indexes/${id}/documents/attach`, payload);
};

export const getAll = async params => {
	return api
		.get(`/indexes?&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterIndexing = async (data: IndexingInterfaceState) => {
	let filter = {
		index: data.index,
	};

	return api
		.get(`/indexes?index=${filter.index}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/indexes/${id}`);
};
