import {
	IServiceReturnGetAllParams,
	ICreateServiceReturnRequest,
	IUpdateServiceReturnRequest,
} from "store/types/serviceReturnTypes";
import { apiWithToken } from ".";

export const getAllServiceReturnApi = (params?: IServiceReturnGetAllParams) => {
	return apiWithToken.get(`/api/transaksi/pengembalian`, {
		params: params,
	});
};

export const createNewServiceReturnApi = (
	input: ICreateServiceReturnRequest,
) => {
	return apiWithToken.post(`/api/transaksi/pengembalian`, input);
};

export const getDetailServiceReturnApi = (id: string) => {
	return apiWithToken.get(`/api/transaksi/pengembalian/${id}`);
};

export const updateServiceReturnApi = (
	id: string,
	input: IUpdateServiceReturnRequest,
) => {
	return apiWithToken.put(`/api/transaksi/pengembalian/${id}`, input);
};

export const deleteServiceReturnApi = (id: string) => {
	return apiWithToken.delete(`/api/transaksi/pengembalian/${id}`);
};
