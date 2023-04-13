import {
	IServiceRequestGetAllParams,
	ICreateServiceRequestRequest,
	IUpdateServiceRequestRequest,
} from "store/types/serviceRequestTypes";
import { apiWithToken } from ".";

export const getAllServiceRequestApi = (
	params?: IServiceRequestGetAllParams,
) => {
	return apiWithToken.get(`/api/master/service-request`, {
		params: params,
	});
};

export const createNewServiceRequestApi = (
	input: ICreateServiceRequestRequest,
) => {
	return apiWithToken.post(`/api/master/service-request`, input);
};

export const getDetailServiceRequestApi = (id: string) => {
	return apiWithToken.get(`/api/master/service-request/${id}`);
};

export const updateServiceRequestApi = (
	id: string,
	input: IUpdateServiceRequestRequest,
) => {
	return apiWithToken.put(`/api/master/service-request/${id}`, input);
};

export const deleteServiceRequestApi = (id: string) => {
	return apiWithToken.delete(`/api/master/service-request/${id}`);
};
