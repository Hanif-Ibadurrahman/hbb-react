import { IInventoryReportGetAllParams } from "store/types/inventoryReportTypes";
import { apiWithToken } from ".";

export const getAllInventoryReportApi = (
	params?: IInventoryReportGetAllParams,
) => {
	return apiWithToken.get(`/api/reporting/laporan-hbb-inventaris`, {
		params: params,
	});
};

export const exportInventoryReportApi = (
	params?: IInventoryReportGetAllParams,
) => {
	return apiWithToken.get(
		`/api/reporting/laporan-hbb-inventaris/generate-link`,
		{
			params: params,
		},
	);
};
