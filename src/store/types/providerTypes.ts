import { PaginationState } from "./paginationTypes";

export interface IProvider {
	id: string;
	nama_penyedia: string | null;
	jabatan: string | null;
	nipg: string | null;
}

export interface IProviderPaginateResponse extends PaginationState {
	data: IProvider[];
}

export interface IProviderGetAllParams {
	page?: number;
	per_page?: number;
	nama_penyedia?: string;
	nipg?: string;
	jabatan?: string;
}

export interface ICreateProviderRequest {
	nama_penyedia: string;
	jabatan: string;
	nipg: string;
}

export interface IUpdateProviderRequest {
	nama_penyedia: string;
	jabatan: string;
	nipg: string;
}

export interface IProviderGetAllResponse {
	status: string;
	message: string;
	data: IProviderPaginateResponse | null;
}

export interface IProviderInterfaceState {
	getAllProviderWithPagination: IProviderPaginateResponse | null;
	title: string;
}

export type ProviderContainerState = IProviderInterfaceState;
