import {
	ILocationGetAllParams,
	ICreateLocationRequest,
	IUpdateLocationRequest,
} from "store/types/locationTypes";
import { apiWithToken } from ".";

export const getAllLocationApi = (params?: ILocationGetAllParams) => {
	return apiWithToken.get(`/api/master/location`, {
		params: params,
	});
};

export const createNewLocationApi = (input: ICreateLocationRequest) => {
	return apiWithToken.post(`/api/master/location`, input);
};
export const getDetailLocationApi = (id: number) => {
	return apiWithToken.get(`/api/master/location/${id}`);
};

export const updateLocationApi = (
	id: number,
	input: IUpdateLocationRequest,
) => {
	return apiWithToken.put(`/api/master/location/${id}`, input);
};

export const deleteLocationApi = (id: number) => {
	return apiWithToken.delete(`/api/master/location/${id}`);
};
