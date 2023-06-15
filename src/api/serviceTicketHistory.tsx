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
