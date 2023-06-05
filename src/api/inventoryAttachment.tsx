import { IInventoryAttachmentGetAllParams } from "store/types/inventoryAttachmentTypes";
import { apiWithToken } from ".";

export const getAllInventoryAttachmentApi = (
	params?: IInventoryAttachmentGetAllParams,
) => {
	return apiWithToken.get(`/api/reporting/lampiran-hbb-inventaris-semester`, {
		params: params,
	});
};

export const exportInventoryAttachmentApi = (
	params?: IInventoryAttachmentGetAllParams,
) => {
	return apiWithToken.get(
		`/api/reporting/lampiran-hbb-inventaris-semester/generate-link`,
		{
			params: params,
		},
	);
};
