import { PaginationState } from "./paginationTypes";

export interface IItem {
	id: string;
	id_area: string | null;
	id_main_group: string | null;
	id_sub_group: string | null;
	name: string | null;
	merk: string | null;
	tipe: string | null;
	jenis: string | null;
	model: string | null;
	warna: string | null;
	kapasitas: string | null;
	ukuran: string | null;
	satuan: string | null;
	id_company: string | null;
}

export interface IItemPaginateResponse extends PaginationState {
	data: IItem[];
}

export interface IItemGetAllParams {
	page?: number;
	page_size?: number;
	main_group?: string;
	sub_group?: string;
	name?: string;
	merk?: string;
	tipe?: string;
	jenis?: string;
	model?: string;
	warna?: string;
	kapasitas?: string;
	ukuran?: string;
}

export interface ICreateItemRequest {
	name: string;
}

export interface IUpdateItemRequest {
	name: string;
}

export interface IItemGetAllResponse {
	status: string;
	message: string;
	data: IItemPaginateResponse | null;
}

export interface IItemInterfaceState {
	countryList: IItem[] | [];
	title: string;
}

export type ItemContainerState = IItemInterfaceState;
