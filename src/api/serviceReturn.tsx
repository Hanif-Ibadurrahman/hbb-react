import {
	IServiceReturnGetAllParams,
	ICreateServiceReturnRequest,
	IUpdateServiceReturnRequest,
} from "store/types/serviceReturnTypes";
import { apiWithToken } from ".";

export const getAllServiceReturnApi = (params?: IServiceReturnGetAllParams) => {
	return apiWithToken.get(`/api/master/service-return`, {
		params: params,
	});
};

export const createNewServiceReturnApi = (
	input: ICreateServiceReturnRequest,
) => {
	return apiWithToken.post(`/api/master/service-return`, input);
};

export const getDetailServiceReturnApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-return/${id}`);
};

export const updateServiceReturnApi = (
	id: string,
	input: IUpdateServiceReturnRequest,
) => {
	return apiWithToken.put(`/api/master/service-return/${id}`, input);
};

export const deleteServiceReturnApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-return/${id}`);
};
