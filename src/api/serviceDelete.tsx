import {
	IServiceDeleteGetAllParams,
	ICreateServiceDeleteRequest,
	IUpdateServiceDeleteRequest,
} from "store/types/serviceDeleteTypes";
import { apiWithToken } from ".";

export const getAllServiceDeleteApi = (params?: IServiceDeleteGetAllParams) => {
	return apiWithToken.get(`/api/master/service-delete`, {
		params: params,
	});
};

export const createNewServiceDeleteApi = (
	input: ICreateServiceDeleteRequest,
) => {
	return apiWithToken.post(`/api/master/service-delete`, input);
};

export const getDetailServiceDeleteApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-delete/${id}`);
};

export const updateServiceDeleteApi = (
	id: string,
	input: IUpdateServiceDeleteRequest,
) => {
	return apiWithToken.put(`/api/master/service-delete/${id}`, input);
};

export const deleteServiceDeleteApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-delete/${id}`);
};
