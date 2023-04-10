import {
	ILocationGetAllParams,
	ICreateLocationRequest,
	IUpdateLocationRequest,
} from "store/types/locationTypes";
import { apiWithToken } from "./dox";

export const getAllLocationApi = (params?: ILocationGetAllParams) => {
	return apiWithToken.get(`/api/master/location`, {
		params: params,
	});
};

export const createNewLocationApi = (input: ICreateLocationRequest) => {
	return apiWithToken.post(`/api/master/location`, input);
};
export const getDetailLocationApi = (id: string) => {
	return apiWithToken.get(`/api/master/location/${id}`);
};

export const updateLocationApi = (
	id: string,
	input: IUpdateLocationRequest,
) => {
	return apiWithToken.put(`/api/master/location/${id}`, input);
};
