import { PaginationState } from "./paginationTypes";

export interface IInventory {
	id: string;
	name: string | null;
	main_group: string | null;
	sub_group: string | null;
	year: string | null;
	serial_no: string | null;
	merk: string | null;
	inventory_type: string | null;
	size: string | null;
	color: string | null;
	tahun_perolehan: string | null;
	location: string | null;
	satker: string | null;
	area: string | null;
	no_akuntansi: string | null;
	penanggung_jawab: string | null;
	ever_transaksi: number | null;
	ever_pindah: number | null;
	ever_hapus: number | null;
	status: number | null;
	kondisi: string | null;
	remark: string | null;
	nipg: string | null;
	code: string | null;
}

export interface IInventoryPaginateResponse extends PaginationState {
	data: IInventory[];
}

export interface IInventoryGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	tahun_perolehan?: string;
	no_akuntansi?: string;
	merk?: string;
	kondisi?: string;
	color?: string;
	size?: string;
	code?: string;
	serial_no?: string;
}

export interface ICreateInventoryRequest {
	name: string;
}

export interface IUpdateInventoryRequest {
	name: string;
}

export interface IInventoryGetAllResponse {
	status: string;
	message: string;
	data: IInventoryPaginateResponse | null;
}

export interface IInventoryInterfaceState {
	getAllInventoryWithPagination: IInventoryPaginateResponse | null;
	title: string;
}

export type InventoryContainerState = IInventoryInterfaceState;
