import {
	IServiceChangeGetAllParams,
	ICreateServiceChangeRequest,
	IUpdateServiceChangeRequest,
} from "store/types/serviceChangeTypes";
import { apiWithToken } from ".";

export const getAllServiceChangeApi = (params?: IServiceChangeGetAllParams) => {
	return apiWithToken.get(`/api/transaksi/perubahan`, {
		params: params,
	});
};

export const createNewServiceChangeApi = (
	input: ICreateServiceChangeRequest,
) => {
	return apiWithToken.post(`/api/transaksi/perubahan`, input);
};

export const getDetailServiceChangeApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/perubahan/${id}`);
};

export const updateServiceChangeApi = (
	id: string,
	input: IUpdateServiceChangeRequest,
) => {
	return apiWithToken.put(`/api/transaksi/perubahan/${id}`, input);
};

export const deleteServiceChangeApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/perubahan/${id}`);
};
