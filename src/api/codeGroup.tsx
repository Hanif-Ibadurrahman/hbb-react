import {
	ICodeGroupGetAllParams,
	ICreateCodeGroupRequest,
	IUpdateCodeGroupRequest,
} from "store/types/codeGroupTypes";
import { apiWithToken } from "./dox";

export const getAllCodeGroupApi = (params?: ICodeGroupGetAllParams) => {
	return apiWithToken.get(`/api/master/main-group`, {
		params: params,
	});
};

export const getDetailCodeGroupApi = (id: string) => {
	return apiWithToken.get(`/api/master/main-group/${id}`);
};

export const createNewCodeGroupApi = (input: ICreateCodeGroupRequest) => {
	return apiWithToken.post(`/api/master/main-group`, input);
};

export const updateCodeGroupApi = (
	id: string,
	input: IUpdateCodeGroupRequest,
) => {
	return apiWithToken.put(`/api/master/main-group/${id}`, input);
};
