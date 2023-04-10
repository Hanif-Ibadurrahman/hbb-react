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
	page_size?: number;
	nama_pengelola?: string;
	nipg?: string;
}

export interface ICreateManagerRequest {
	name: string;
}

export interface IUpdateManagerRequest {
	name: string;
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
