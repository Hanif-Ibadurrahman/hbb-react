import { ICorporateInventoryReportGetAllParams } from "store/types/corporateInventoryReportTypes";
import { apiWithToken } from ".";

export const getAllCorporateInventoryReportApi = (
	params?: ICorporateInventoryReportGetAllParams,
) => {
	return apiWithToken.get(`/api/reporting/laporan-hbb-inventaris-korporat`, {
		params: params,
	});
};

export const exportCorporateInventoryReportApi = (
	params?: ICorporateInventoryReportGetAllParams,
) => {
	return apiWithToken.get(
		`/api/reporting/laporan-hbb-inventaris-korporat/export`,
		{
			params: params,
		},
	);
};
