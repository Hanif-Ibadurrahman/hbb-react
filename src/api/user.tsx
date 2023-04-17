import {
	IUserGetAllParams,
	ICreateUserRequest,
	IUpdateUserRequest,
} from "store/types/userTypes";
import { apiWithToken } from ".";

export const getAllUserApi = (params?: IUserGetAllParams) => {
	return apiWithToken.get(`/api/master/user`, {
		params: params,
	});
};

export const createNewUserApi = (input: ICreateUserRequest) => {
	return apiWithToken.post(`/api/master/user`, input);
};
export const getDetailUserApi = (id: string) => {
	return apiWithToken.get(`/api/master/user/${id}`);
};

export const updateUserApi = (id: string, input: IUpdateUserRequest) => {
	return apiWithToken.put(`/api/master/user/${id}`, input);
};

export const deleteUserApi = (id: string) => {
	return apiWithToken.delete(`/api/master/user/${id}`);
};
