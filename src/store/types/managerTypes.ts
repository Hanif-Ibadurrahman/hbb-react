import { PaginationState } from "./paginationTypes";

export interface IManager {
	id: string;
	nama_pengelola: string | null;
	jabatan: string | null;
	nipg: string | null;
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
}

export interface IUpdateManagerRequest {
	nama_pengelola: string;
	jabatan: string;
	nipg: string;
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
