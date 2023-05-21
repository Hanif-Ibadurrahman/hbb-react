import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface IProvider {
	id: number;
	nama_penyedia: string | null;
	nipg: string | null;
	jabatan: string | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	company: ICompany | null;
}

export interface IProviderPaginateResponse extends PaginationState {
	data: IProvider[];
}

export interface IProviderGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	nama_penyedia?: string;
	nipg?: string;
	jabatan?: string;
	company?: string;
}

export interface ICreateProviderRequest {
	nama_penyedia: string;
	jabatan: string;
	nipg: string;
	id_company: number;
}

export interface IUpdateProviderRequest {
	nama_penyedia: string;
	jabatan: string;
	nipg: string;
	id_company: number;
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
