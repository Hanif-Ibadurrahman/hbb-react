import {
	IDivisionGetAllParams,
	ICreateDivisionRequest,
	IUpdateDivisionRequest,
} from "store/types/divisionTypes";
import { apiWithToken } from ".";

export const getAllDivisionApi = (params?: IDivisionGetAllParams) => {
	return apiWithToken.get(`/api/master/division`, {
		params: params,
	});
};

export const getDetailDivisionApi = (id: string) => {
	return apiWithToken.get(`/api/master/division/${id}`);
};

export const createNewDivisionApi = (input: ICreateDivisionRequest) => {
	return apiWithToken.post(`/api/master/division`, input);
};

export const updateDivisionApi = (
	id: string,
	input: IUpdateDivisionRequest,
) => {
	return apiWithToken.put(`/api/master/division/${id}`, input);
};
