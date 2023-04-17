import {
	IServiceReplacementGetAllParams,
	ICreateServiceReplacementRequest,
	IUpdateServiceReplacementRequest,
} from "store/types/serviceReplacementTypes";
import { apiWithToken } from ".";

export const getAllServiceReplacementApi = (
	params?: IServiceReplacementGetAllParams,
) => {
	return apiWithToken.get(`/api/master/service-replacement`, {
		params: params,
	});
};

export const createNewServiceReplacementApi = (
	input: ICreateServiceReplacementRequest,
) => {
	return apiWithToken.post(`/api/master/service-replacement`, input);
};

export const getDetailServiceReplacementApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-replacement/${id}`);
};

export const updateServiceReplacementApi = (
	id: string,
	input: IUpdateServiceReplacementRequest,
) => {
	return apiWithToken.put(`/api/master/service-replacement/${id}`, input);
};

export const deleteServiceReplacementApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-replacement/${id}`);
};
