import { IRoomInventoryGetAllParams } from "store/types/roomInventoryTypes";
import { apiWithToken } from ".";

export const getAllRoomInventoryApi = (params?: IRoomInventoryGetAllParams) => {
	return apiWithToken.get(
		`/api/reporting/laporan-daftar-hbb-inventaris-ruangan`,
		{
			params: params,
		},
	);
};

export const exportRoomInventoryApi = (params?: IRoomInventoryGetAllParams) => {
	return apiWithToken.get(
		`/api/reporting/laporan-daftar-hbb-inventaris-ruangan/export`,
		{
			params: params,
		},
	);
};
