import {
	ApprovalInterfaceState,
	ApprovalOperationInterfaceState,
	RequestBoxInterfaceState,
} from "store/Types/RequestBoxTypes";
import api from "./dox";
export const create = async (data: RequestBoxInterfaceState) => {
	let payload = {
		quantity: data.Quantity,
		delivered_at: data.DeliveredAt,
		note: data.Note,
		status: data.Status,
		code_boxes: data.CodeBoxes["Id_Box"],
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
		code_boxes: data.CodeBoxes,
	};
	console.log(payload);
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
	console.log(payload);
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
	console.log(payload);
	return await api.put(`/requests/${id}/operation-approved/`, payload);
};

export const approval_operation = async (
	data: ApprovalOperationInterfaceState,
) => {
	let id = data?.Id;
	let payload = {
		is_approved: data?.Approved,
		delivery_date: data?.Date,
		archiver_id: data?.Archiver,
		transporter_id: data?.Transporter,
	};
	console.log(payload);
	return await api.put(`/requests/${id}/operation-approved/`, payload);
};
