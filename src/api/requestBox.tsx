import {
	ApprovalInterfaceState,
	ApprovalOperationInterfaceState,
	RequestBoxInterfaceState,
} from "store/Types/RequestBoxTypes";
import api from "./dox";
export const create = async (data: RequestBoxInterfaceState) => {
	let payload = {
		quantity: data.quantity,
		delivered_at: data.delivered_at,
		delivery_method: data.delivery_method,
		note: data.note,
		code_boxes: data.code_boxes,
	};
	console.log("Kambing Hitam Abdi", payload);

	return api.post("/request-box", payload);
};

export const update = async (data: RequestBoxInterfaceState) => {
	let id = data.id;
	let payload = {
		quantity: data.quantity,
		delivered_at: data.delivered_at,
		note: data.note,
		status: data.status,
		code_boxes: data.code_boxes,
	};
	return await api.put(`/request-box/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/requests/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/requests?status=created`, {
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

export const approval_admin = async (data: ApprovalInterfaceState) => {
	let id = data?.Id;
	let payload = {
		is_approved: data?.Approved,
		description: data?.Description,
	};
	return await api.put(`/requests/${id}/csr-approved/`, payload);
};

export const getAllConfirmed = async params => {
	return api
		.get(`/requests?status=confirmed-by-csr-admin`, {
			params: params,
		})
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const reject_operation = async (data: ApprovalInterfaceState) => {
	let id = data?.Id;
	let payload = {
		is_approved: data?.Approved,
		description: data?.Description,
	};
	return await api.put(`/requests/${id}/operation-approved/`, payload);
};

export const approval_operation = async (
	data: ApprovalOperationInterfaceState,
) => {
	let id = data?.id;
	let payload = {
		is_approved: data?.is_approved,
		delivery_date: data?.delivery_date,
		archiver_id: data?.archiver_id?.staff?.id,
		transporter_id: data?.transporter_id?.staff?.id,
	};
	return await api.put(`/requests/${id}/operation-approved/`, payload);
};
