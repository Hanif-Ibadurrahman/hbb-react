import {
	IServiceDeleteGetAllParams,
	ICreateServiceDeleteRequest,
	IUpdateServiceDeleteRequest,
	IServiceDeleteApproveRequest,
} from "store/types/serviceDeleteTypes";
import { apiWithToken } from ".";

export const getAllServiceDeleteApi = (params?: IServiceDeleteGetAllParams) => {
	return apiWithToken.get(`/api/transaksi/penghapusan`, {
		params: params,
	});
};

export const createNewServiceDeleteApi = (
	input: ICreateServiceDeleteRequest,
) => {
	return apiWithToken.post(`/api/transaksi/penghapusan`, input);
};

export const getDetailServiceDeleteApi = (id: number) => {
	return apiWithToken.get(`/api/transaksi/penghapusan/${id}`);
};

export const updateServiceDeleteApi = (
	id: number,
	input: IUpdateServiceDeleteRequest,
) => {
	return apiWithToken.put(`/api/transaksi/penghapusan/${id}`, input);
};

export const deleteServiceDeleteApi = (id: number) => {
	return apiWithToken.delete(`/api/transaksi/penghapusan/${id}`);
};

export const approveServiceDeleteApi = (
	id: number,
	input: IServiceDeleteApproveRequest,
) => {
	return apiWithToken.post(`/api/approval/penghapusan/approve/${id}`, input);
};

export const rejectServiceDeleteApi = (
	id: number,
	input: { remark: string },
) => {
	return apiWithToken.post(`/api/approval/penghapusan/reject/${id}`, input);
};

export const getAllReasonRequestDeleteApi = () => {
	return apiWithToken.get(`/api/transaksi/penghapusan/keterangan/penghapusan`);
};

export const getAllConditionRequestDeleteApi = () => {
	return apiWithToken.get(`/api/transaksi/penghapusan/keterangan/kondisi`);
};
