import { PaginationState } from "./paginationTypes";

export interface IInventoryAttachment {
	id: number;
}

export interface IInventoryAttachmentPaginateResponse extends PaginationState {
	data: IInventoryAttachment[];
}

export interface IInventoryAttachmentGetAllParams {
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

export interface IInventoryAttachmentGetAllResponse {
	status: string;
	message: string;
	data: IInventoryAttachmentPaginateResponse | null;
}

export interface IInventoryAttachmentInterfaceState {
	getAllInventoryWithPagination: IInventoryAttachmentPaginateResponse | null;
	title: string;
}

export type InventoryAttachmentContainerState =
	IInventoryAttachmentInterfaceState;
