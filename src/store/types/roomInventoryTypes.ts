import { PaginationState } from "./paginationTypes";

export interface IRoomInventory {
	id: number;
}

export interface IRoomInventoryPaginateResponse extends PaginationState {
	data: IRoomInventory[];
}

export interface IRoomInventoryGetAllParams {
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

export interface IRoomInventoryGetAllResponse {
	status: string;
	message: string;
	data: IRoomInventoryPaginateResponse | null;
}

export interface IRoomInventoryInterfaceState {
	getAllInventoryWithPagination: IRoomInventoryPaginateResponse | null;
	title: string;
}

export type RoomInventoryContainerState = IRoomInventoryInterfaceState;
