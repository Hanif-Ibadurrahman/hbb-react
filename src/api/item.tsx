import {
	IItemGetAllParams,
	ICreateItemRequest,
	IUpdateItemRequest,
} from "store/types/itemTypes";
import { apiWithToken } from ".";

export const getAllItemApi = (params?: IItemGetAllParams) => {
	return apiWithToken.get(`/api/master/item`, {
		params: params,
	});
};

export const getDetailItemApi = (id: string) => {
	return apiWithToken.get(`/api/master/item/${id}`);
};

export const createNewItemApi = (input: ICreateItemRequest) => {
	return apiWithToken.post(`/api/master/item`, input);
};

export const updateItemApi = (id: string, input: IUpdateItemRequest) => {
	return apiWithToken.put(`/api/master/item/${id}`, input);
};

export const deleteItemApi = (id: string) => {
	return apiWithToken.delete(`/api/master/Item/${id}`);
};
