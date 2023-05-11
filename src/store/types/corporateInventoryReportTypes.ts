import { PaginationState } from "./paginationTypes";

export interface ICorporateInventoryReport {
	id: number;
}

export interface ICorporateInventoryReportPaginateResponse
	extends PaginationState {
	data: ICorporateInventoryReport[];
}

export interface ICorporateInventoryReportGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	inventory_type?: number;
	id_company?: number;
	tanggal_awal?: string;
	tanggal_akhir?: string;

	//add for condition
	type_export?: string;
}

export interface ICorporateInventoryReportGetAllResponse {
	status: string;
	message: string;
	data: ICorporateInventoryReportPaginateResponse | null;
}

export interface ICorporateInventoryReportInterfaceState {
	getAllInventoryWithPagination: ICorporateInventoryReportPaginateResponse | null;
	title: string;
}

export type CorporateInventoryReportContainerState =
	ICorporateInventoryReportInterfaceState;
