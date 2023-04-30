import {
	IServiceDisplacementGetAllParams,
	ICreateServiceDisplacementRequest,
	IUpdateServiceDisplacementRequest,
} from "store/types/serviceDisplacementTypes";
import { apiWithToken } from ".";

export const getAllServiceDisplacementApi = (
	params?: IServiceDisplacementGetAllParams,
) => {
	return apiWithToken.get(`/api/transaksi/pemindahan`, {
		params: params,
	});
};

export const createNewServiceDisplacementApi = (
	input: ICreateServiceDisplacementRequest,
) => {
	return apiWithToken.post(`/api/transaksi/pemindahan`, input);
};

export const getDetailServiceDisplacementApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/pemindahan/${id}`);
};

export const updateServiceDisplacementApi = (
	id: string,
	input: IUpdateServiceDisplacementRequest,
) => {
	return apiWithToken.put(`/api/transaksi/pemindahan/${id}`, input);
};

export const deleteServiceDisplacementApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/pemindahan/${id}`);
};

export const approveServiceDisplacementApi = (id: string) => {
	return apiWithToken.get(`/api/approval/pemindahan/approve/${id}`);
};

export const rejectServiceDisplacementApi = (
	id: string,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pemindahan/reject/${id}`, input);
};
