import {
	IServiceRequestGetAllParams,
	ICreateServiceRequestRequest,
	IUpdateServiceRequestRequest,
} from "store/types/serviceRequestTypes";
import { apiWithToken } from ".";

export const getAllServiceRequestApi = (
	params?: IServiceRequestGetAllParams,
) => {
	return apiWithToken.get(`/api/transaksi/permintaan`, {
		params: params,
	});
};

export const createNewServiceRequestApi = (
	input: ICreateServiceRequestRequest,
) => {
	return apiWithToken.post(`/api/transaksi/permintaan`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getDetailServiceRequestApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/permintaan/${id}`);
};

export const updateServiceRequestApi = (
	id: string,
	input: IUpdateServiceRequestRequest,
) => {
	return apiWithToken.put(`/api/transaksi/permintaan/${id}`, input, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const deleteServiceRequestApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/permintaan/${id}`);
};

export const approveServiceRequestApi = (id: string) => {
	return apiWithToken.get(`/api/approval/permintaan/approve/${id}`);
};

export const rejectServiceRequestApi = (
	id: string,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/permintaan/reject/${id}`, input);
};
