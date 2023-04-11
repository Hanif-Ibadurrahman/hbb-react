import {
	IInventoryGetAllParams,
	ICreateInventoryRequest,
	IUpdateInventoryRequest,
} from "store/types/inventoryTypes";
import { apiWithToken } from "./dox";

export const getAllInventoryApi = (params?: IInventoryGetAllParams) => {
	return apiWithToken.get(`/api/inventory`, {
		params: params,
	});
};

export const createNewInventoryApi = (input: ICreateInventoryRequest) => {
	return apiWithToken.post(`/api/inventory`, input);
};
export const getDetailInventoryApi = (id: string) => {
	return apiWithToken.get(`/api/inventory/${id}`);
};

export const updateInventoryApi = (
	id: string,
	input: IUpdateInventoryRequest,
) => {
	return apiWithToken.put(`/api/inventory/${id}`, input);
};
