import {
	IServiceReplacementGetAllParams,
	ICreateServiceReplacementRequest,
	IUpdateServiceReplacementRequest,
} from "store/types/serviceReplacementTypes";
import { apiWithToken } from ".";

export const getAllServiceReplacementApi = (
	params?: IServiceReplacementGetAllParams,
) => {
	return apiWithToken.get(`/api/transaksi/penggantian`, {
		params: params,
	});
};

export const createNewServiceReplacementApi = (
	input: ICreateServiceReplacementRequest,
) => {
	return apiWithToken.post(`/api/transaksi/penggantian`, input);
};

export const getDetailServiceReplacementApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/penggantian/${id}`);
};

export const updateServiceReplacementApi = (
	id: string,
	input: IUpdateServiceReplacementRequest,
) => {
	return apiWithToken.put(`/api/transaksi/penggantian/${id}`, input);
};

export const deleteServiceReplacementApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/penggantian/${id}`);
};
