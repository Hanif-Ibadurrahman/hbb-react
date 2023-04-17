import {
	IServiceChangeGetAllParams,
	ICreateServiceChangeRequest,
	IUpdateServiceChangeRequest,
} from "store/types/serviceChangeTypes";
import { apiWithToken } from ".";

export const getAllServiceChangeApi = (params?: IServiceChangeGetAllParams) => {
	return apiWithToken.get(`/api/master/service-replacement`, {
		params: params,
	});
};

export const createNewServiceChangeApi = (
	input: ICreateServiceChangeRequest,
) => {
	return apiWithToken.post(`/api/master/service-replacement`, input);
};

export const getDetailServiceChangeApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-replacement/${id}`);
};

export const updateServiceChangeApi = (
	id: string,
	input: IUpdateServiceChangeRequest,
) => {
	return apiWithToken.put(`/api/master/service-replacement/${id}`, input);
};

export const deleteServiceChangeApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-replacement/${id}`);
};
