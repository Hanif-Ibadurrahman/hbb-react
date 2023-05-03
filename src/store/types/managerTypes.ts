import { PaginationState } from "./paginationTypes";

export interface IManager {
	id: number;
	nama_pengelola: string | null;
	jabatan: string | null;
	nipg: string | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
}

export interface IManagerPaginateResponse extends PaginationState {
	data: IManager[];
}

export interface IManagerGetAllParams {
	page?: number;
	per_page?: number;
	nama_pengelola?: string;
	nipg?: string;
	jabatan?: string;
}

export interface ICreateManagerRequest {
	nama_pengelola: string;
	jabatan: string;
	nipg: string;
	id_company: number | null;
}

export interface IUpdateManagerRequest {
	nama_pengelola: string;
	jabatan: string;
	nipg: string;
	id_company: number | null;
}

export interface IManagerGetAllResponse {
	status: string;
	message: string;
	data: IManagerPaginateResponse | null;
}

export interface IManagerInterfaceState {
	getAllManagerWithPagination: IManagerPaginateResponse | null;
	title: string;
}

export type ManagerContainerState = IManagerInterfaceState;
