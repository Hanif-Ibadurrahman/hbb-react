import { PaginationState } from "./paginationTypes";

export interface IInventoryReport {
	id: number;
}

export interface IInventoryReportPaginateResponse extends PaginationState {
	data: IInventoryReport[];
}

export interface IInventoryReportGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	inventory_type?: number;
	id_company?: number;
	id_bisnis_unit?: number;
	id_area?: number;
	id_satker?: number;
	id_location?: number;
	id_main_group?: number;
	id_sub_group?: number;
	tanggal_awal?: string;
	tanggal_akhir?: string;

	//add for condition
	type_export?: string;
}

export interface IInventoryReportGetAllResponse {
	status: string;
	message: string;
	data: IInventoryReportPaginateResponse | null;
}

export interface IInventoryReportInterfaceState {
	getAllInventoryWithPagination: IInventoryReportPaginateResponse | null;
	title: string;
}

export type InventoryReportContainerState = IInventoryReportInterfaceState;
