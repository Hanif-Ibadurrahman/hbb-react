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

export const getDetailServiceDisplacementApi = (id: number) => {
	return apiWithToken.get(`/api/transaksi/pemindahan/${id}`);
};

export const updateServiceDisplacementApi = (
	id: number,
	input: IUpdateServiceDisplacementRequest,
) => {
	return apiWithToken.put(`/api/transaksi/pemindahan/${id}`, input);
};

export const deleteServiceDisplacementApi = (id: number) => {
	return apiWithToken.delete(`/api/transaksi/pemindahan/${id}`);
};

export const approveServiceDisplacementApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pemindahan/approve/${id}`, input);
};

export const rejectServiceDisplacementApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/pemindahan/reject/${id}`, input);
};
