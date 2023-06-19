import { IServiceTicketHistoryGetAllParams } from "store/types/serviceTicketHistoryTypes";
import { apiWithToken } from ".";

export const getAllServiceTicketHistoryApi = (
	params?: IServiceTicketHistoryGetAllParams,
) => {
	return apiWithToken.get(`api/transaksi/riwayat-transaksi`, {
		params: params,
	});
};

export const getDetailServiceTicketHistoryApi = (id: number) => {
	return apiWithToken.get(`api/transaksi/riwayat-transaksi/${id}`);
};

export const getApprovalLogApi = (id: number) => {
	return apiWithToken.get(`api/approval/log-approval/${id}`);
};

export const getReplacementFormApi = (id: number) => {
	return apiWithToken.get(`api/reporting/formulir-transaksi/penggantian/${id}`);
};

export const getReturnFormApi = (id: number) => {
	return apiWithToken.get(
		`api/reporting/formulir-transaksi/pengembalian/${id}`,
	);
};

export const getRequestFormApi = (id: number) => {
	return apiWithToken.get(`api/reporting/formulir-transaksi/permintaan/${id}`);
};

export const getRepairFormApi = (id: number) => {
	return apiWithToken.get(`api/reporting/formulir-transaksi/perbaikan/${id}`);
};

export const getDeleteFormApi = (id: number) => {
	return apiWithToken.get(
		`api/reporting/formulir-transaksi/usulan-penghapusan/${id}`,
	);
};
